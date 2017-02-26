# liteEJS

一个可以在浏览器上运行的ejs模板引擎（精简版）

业务需求突发奇想搞出来的东西，虽然还有缺陷，但小巧能用。  
就是在HTML中混用js，使用类似ejs的语法，用<%%>包裹js代码。 暂时只支持字符串解析<%%>和<%=%>两种ejs语法。

## 使用方法

1. 引入js；
2. 调用函数liteEJS(template,data)，第一个参数是模板字符串，第二次参数的数据对象；
3. 函数返回一个拼接好的字符串，之后可用原生js或jquery插入到页面上。

## 例子
[demo](https://github.com/zwei76/liteEJS/raw/master/demo.html)
```
//数据
var json = {
    list: [{
            text: 'fitst'
        },
        {
            text: 'second'
        },
        {
            text: 'third'
        }
    ]
}
//模板
var template = '<% for(var i = 0;i<data.length;i++){%><li><%=data[i].text%></li><%}%>'
//合并后打入html
document.getElementById('needText').innerHTML = liteEJS(template,json.list);
```

## 注意
1. 只支持纯字符串，请自行处理号引号问题；
2. 模板内的数据名只能是data，也就是说无论传入什么名字的数据，模板中均用data拿到;
3. 循环变量请在模板内新建，避免污染全局变量。
