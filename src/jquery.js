window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements

  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate.trim().indexOf("<") === 0) {
      elements = [createElement(selectorOrArrayOrTemplate)]
    } else {
      elements = Array.from(document.querySelectorAll(selectorOrArrayOrTemplate))
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate
  }

  function createElement(string) {
    const container = document.createElement("template")
    container.innerHTML = string.trim()
    return container.content.firstChild
  }

  const api = Object.create($.fn)
  Object.assign(api, {
    elements: elements,
    length: elements.length,
    oldApi: elements.oldApi
  })
  return api
}

$.fn = $.prototype = {
  constructor: $,
  jquery: true,
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i)
    }
    return this
  },
  find(selector) {
    let array = []
    this.each((element) => {
      array = array.concat(Array.from(element.querySelectorAll(selector)))
    })
    array.oldApi = this
    return $(array)
  },
  get(index) {
    if (index === undefined) {
      return this.elements
    } else {
      return this.elements[index]
    }
  },
  appendTo(node) {
    if (node instanceof Element) {
      this.each((element) => node.appendChild(element))
    } else if (node.jquery === true) {
      this.each((element) => node.get(0).appendChild(element))
    }
    return this
  },
  append(children) {
    if (children instanceof Element) {
      this.each((element) => {
        element.appendChild(children.cloneNode(true))
      })
    } else if (children instanceof HTMLCollection) {
      for (let i = 0; i < children.length; i++) {
        this.each((element) => {
          element.appendChild(children[i].cloneNode(true))
        })
      }
    } else if (children.jquery === true) {
      this.each((element) => {
        children.each((element2) => {
          element.appendChild(element2.cloneNode(true))
        })
      })
    } else if (typeof children === 'string' && children.trim().indexOf("<") === 0) {
      this.each((element) => {
        element.appendChild($(children).elements[0])
      })
    }
    return this
  },
  parent() {
    let array = []
    this.each((element) => {
      if (array.indexOf(element.parentNode) === -1) {
        array.push(element.parentNode)
      }
    })
    array.oldApi = this
    return $(array)
  },
  prepend(children) {
    if (children instanceof Element) {
      this.each((element) => {
        element.insertBefore(children.cloneNode(true), element.firstChild)
      })
    } else if (children instanceof HTMLCollection) {
      for (let i = 0; i < children.length; i++) {
        this.each((element) => {
          element.insertBefore(children[i].cloneNode(true), element.firstChild)
        })
      }
    } else if (children.jquery === true) {
      this.each((element) => {
        children.each((element2) => {
          element.insertBefore(element2.cloneNode(true), element.firstChild)
        })
      })
    } else if (typeof children === 'string' && children.trim().indexOf("<") === 0) {
      this.each((element) => {
        element.insertBefore($(children).elements[0], element.firstChild)
      })
    }
    return this
  },
  clone() {
    let array = []
    this.each((element) => {
      array.push(element.cloneNode(true))
    })
    array.oldApi = this
    return $(array)
  },
  children() {
    let array = []
    this.each((element) => {
      array.push(...element.children)
    })
    array.oldApi = this
    return $(array)
  },
  siblings() {
    let array = []
    this.parent().children().elements.reduce((result, item) => {
      if (this.elements.indexOf(item) === -1) {
        result.push(item)
      }
      return result
    }, array)
    array.oldApi = this
    return $(array)
  },
  index() {
    let array = []
    for (let i = 0; i < this.elements.length; i++) {
      const list = this.elements[i].parentNode.children
      let j
      for (j = 0; j < list.length; j++) {
        if (list[j] === this.elements[i]) {
          break
        }
      }
      array.push(j)
    }
    return array
  },
  next() {
    let array = []
    this.each((element) => {
      array.push(element.nextElementSibling)
    })
    array.oldApi = this
    return $(array)
  },
  previous() {
    let array = []
    this.each((element) => {
      array.push(element.previousElementSibling)
    })
    array.oldApi = this
    return $(array)
  },
  after(node) {
    if (node.jquery === true) {
      this.each((element) => {
        node.each((element2) => {
          element.parentNode.insertBefore(element2.cloneNode(true), element.nextSibling)
        })
      })
    } else if (typeof node === 'string' && node.trim().indexOf('<') === 0) {
      this.each((element) => {
        element.parentNode.insertBefore($(node).elements[0], element.nextSibling)
      })
    }
    return this
  },
  before(node) {
    if (node.jquery === true) {
      this.each((element) => {
        node.each((element2) => {
          element.parentNode.insertBefore(element2.cloneNode(true), element)
        })
      })
    } else if (typeof node === 'string' && node.trim().indexOf('<') === 0) {
      this.each((element) => {
        element.parentNode.insertBefore($(node).elements[0], element)
      })
    }
    return this
  },
  remove() {
    let array = []
    this.each((element) => {
      element.parentNode.removeChild(element)
      array.push(element)
    })
    return array
  },
  empty() {
    let array = []
    this.each((element) => {
      let x = element.firstChild
      while (x) {
        array.push(element.removeChild(x))
        x = element.firstChild
      }
    })
    return array
  },
  text(string) {
    let array = []
    if (arguments.length === 0) {
      this.each((element) => {
        if ('innerText' in element) {
          array.push(element.innerText)
        } else {
          array.push(element.innerText)
        }
      })
      return array
    } else if (arguments.length === 1) {
      this.each((element) => {
        if ('innerText' in element) {
          element.innerText = string
        } else {
          element.textContent = string
        }
      })
    }
  },
  html(string) {
    let array = []
    if (arguments.length === 0) {
      this.each((element) => {
        // console.log(element.innerHTML)
        array.push(element.innerHTML)
      })
      return array
    } else if (arguments.length === 1) {
      this.each((element) => {
        element.innerHTML = string
      })
    }
  },
  attr(name, value) {
    let array = []
    if (arguments.length === 1) {
      this.each((element) => {
        array.push(element.getAttribute(name))
      })
      return array
    } else if (arguments.length === 2) {
      this.each((element) => {
        element.setAttribute(name, value)
      })
    }
  },
  css(name, value) {
    let array = []
    if (arguments.length === 1 && typeof name === 'string') {
      this.each((element) => {
        array.push(element.style[name])
      })
      return array
    } else if (arguments.length === 1 && name instanceof Object) {
      const object = name
      this.each((element) => {
        for (let key in object) {
          element.style[key] = object[key]
        }
      })
    } else if (arguments.length === 2) {
      this.each((element) => {
        element.style[name] = value
      })
    }
  },
  addClass(className) {
    this.each((element) => {
      element.classList.add(className)
    })
    return this
  },
  removeClass(className) {
    this.each((element) => {
      element.classList.remove(className)
    })
    return this
  },
  hasClass(className) {
    let array = []
    this.each((element) => {
      array.push(element.classList.contains(className))
    })
    return array
  },
  on(eventName, fn) {
    this.each((element) => {
      element.addEventListener(eventName, fn)
    })
    return this
  },
  off(eventName, fn) {
    this.each((element) => {
      element.removeEventListener(eventName, fn)
    })
    return this
  },
  delegate(eventType, selector, fn) {
    const element = this.elements[0]
    element.addEventListener(eventType, (e) => {
      let target = e.target
      while (!target.matches(selector)) {
        if (element === target) {
          target = null
          break
        }
        target = target.parentNode
      }
      target && fn.call(target, e, target)
    })
    return this
  },
  size() {
    return this.elements.length
  },
  print() {
    console.log(this.elements)
    return this
  },
  end() {
    return this.oldApi
  }
}