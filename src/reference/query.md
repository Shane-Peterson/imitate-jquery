# 选择网页元素

![query](../images/query.png)


获取 document.body 

```javascript
$('body')
```

查找 #xxx 里的 .red 元素

```javascript
$('#xxx').find('.red')
```

获取爸爸

```javascript
$('#xxx').parent()  
```

获取儿子

```javascript
$('#xxx').children() 
```

获取兄弟

```javascript
$('#xxx').siblings()  
```

获取排行（从 0 开始）

```javascript
$('#xxx').index()  
```

获取弟弟

```javascript
$('#xxx').next() 
```

获取哥哥

```javascript
$('#xxx').previous() 
```

遍历并对每一个元素执行 fn

```javascript
$('.red').each(fn) 
```

查询是否拥有指定的 class

```javascript
$div.hasClass('blue')
```

回到上一个 jQuery 对象

```javascript
$div.end()
```

打印 jQuery 对象 的 elements 属性

```javascript
$div.print()
```
