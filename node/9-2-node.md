# node 

## node 回调

函数调用分： 同步调用，回调，和异步调用。

回调是一种双向调用模式，可以通过回调函数来实现回调

## 阻塞与非阻塞

阻塞就等待事件完成，下面的都不运行。
非阻塞就是先做，不影响其他代码运行，做完了返回数据。

## 事件驱动机制

### 事件驱动模型

eventEmitters -> Events -> Event loop -> Event Handlers  

### 事件处理代码流程

1. 引入events对象，创建eventEmitter对象
2. 绑定事件处理程序。
3. 触发事件。

## node 模块化

![模块化](/node-module.png)

## nodejs 函数

和js的函数一样

## node 路由

我们要为路由提供请求的 URL 和其他需要的 GET 及 POST 参数，随后路由需要根据这些数据来执行相应的代码。

用 url 和 querystring 模块来解析路由。


## node 全局变量

- 在最外层定义的变量；
- 全局对象的属性；
- 隐式定义的变量（未定义直接赋值的变量）。

更多：[http://nodejs.cn/api/globals.html]()

## node 常用工具

- util.inherits

    是一个实现对象间原型继承的函数。

        util.inherits('子类','父类');

- util.inspect 

    是将任意对象转换为字符串的方法。

- util.isArray

    判断是否为数组，返回的true或者false

- util.isRegExp

     判断是否为正则表达式，返回的true或者false

- util.isDate

    判断是否为日期，返回的true或者false

- util.isError(object)

    判断是否为错误对象，返回true或者false

更多访问：[http://nodejs.cn/api/util.html]()

## node 文件系统

fs = require("fs")

操作文件的读和写

##异步IO

cpu 时钟周期: 1/cpu 主频 -> 1s/3.1 GHz
