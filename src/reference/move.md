# 元素的移动

![move](../images/edit.png)

把新增的元素放到另一个元素里

```javascript
$('<div><span>1</span></div>').appendTo()
```

添加小儿子

```javascript
$('body').append($('<div>1</div>'))
$('body').append('<div>1</div>') //更方便
```

添加大儿子

```javascript
$('body').prepend($('<div>1</div>'))
$('body').prepend('<div>1</div>') // 更方便
```

添加个弟弟

```javascript
$('body').after($('<div>1</div>'))
$('body').after('<div>1</div>') //更方便
```

添加个哥哥

```javascript
$('body').before($('<div>1</div>'))
$('body').before('<div>1</div>') //更方便
```