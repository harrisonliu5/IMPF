# Express

## 路由

> 路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。

路由是由一个 URI、HTTP 请求（GET、POST等）和若干个句柄组成，它的结构如下： app.METHOD(path, [callback...], callback)， app 是 express 对象的一个实例， METHOD 是一个 HTTP 请求方法， path 是服务器上的路径， callback 是当路由匹配时要执行的函数。

app.all()是指对一个path上的所有请求都需要执行中间件。

        app.all('/secret', function (req, res, next) {
            console.log('Accessing the secret section ...');
            next(); // pass control to the next handler
        });

### 路由路径:

> 路由路径和请求方法一起定义了请求的端点，它可以是字符串、字符串模式或者正则表达式。

/ ：根路由。

/controller/action : 一个controll可以跟多个action。

#### 使用字符串模式的路由路径示例：

    // 匹配 acd 和 abcd
    app.get('/ab?cd', function(req, res) {
        res.send('ab?cd');
    });
    
    // 匹配 abcd、abbcd、abbbcd等
    app.get('/ab+cd', function(req, res) {
        res.send('ab+cd');
    });
    
    // 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
    app.get('/ab*cd', function(req, res) {
        res.send('ab*cd');
    });
    
    // 匹配 /abe 和 /abcde
    app.get('/ab(cd)?e', function(req, res) {
        res.send('ab(cd)?e');
    });

#### 使用正则表达式的路由路径示例：

        // 匹配任何路径中含有 a 的路径：
        app.get(/a/, function(req, res) {
            res.send('/a/');
        });
    
        // 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
        app.get(/.*fly$/, function(req, res) {
            res.send('/.*fly$/');
        });

### 路由句柄

可以为请求处理提供多个回调函数，其行为类似 __中间件__。唯一的区别是这些回调函数有可能调用 next('route') 方法而略过其他路由回调函数。

可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。

路由句柄有多种形式，可以是一个函数、一个函数数组，或者是两者混合。

#### 使用一个回调函数处理路由：

        app.get('/',function(req, res) {
            res.send('Hello World');
        });

#### 使用多个回调函数处理路由（记得指定 next 对象）：

        app.get('/',function(req, res, next) {
           console.log('step first');
           next(); 
        }, function(req, res){
            res.send('Hello World');
        });

#### 使用回调函数数组处理路由：

        var step1 = function (req, res, next){
            console.log('step first 1');
            next();
        }
    
        var step2 = function (req, res, next){
            console.log('step first 2');
            next();
        }
    
        var step3 = function (req, res){
            res.send('Hellow World');
        }
    
        app.get('/',[step1.step2,step3]);

#### 混合使用函数和函数数组处理路由：

        var step1 = function (req, res, next) {
            console.log('CB0');
            next();
        }
    
        var step2 = function (req, res, next) {
            console.log('CB1');
            next();
        }
    
        app.get('/', [step1, step2], function (req, res, next) {
            console.log('response will be sent by the next function ...');
            next();
        }, function (req, res) {
            res.send('Hello from');
        });

### 响应方法

通过下面的响应对象（res）的方法向客户端返回响应，终结请求响应的循环。如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起。
|方法                       |描述                  |
|-----------------------|------------------|
|res.download()         |提示下载文件。|
|res.end()                  |终结响应处理流程。|
|res.json()                 |发送一个 JSON 格式的响应。|
|res.jsonp()                |发送一个支持 JSONP 的 JSON 格式的响应。|
|res.redirect()	          |重定向请求。|
|res.render()              |渲染视图模板。|
|res.send()                 |发送各种类型的响应。|
|res.sendFile	           |以八位字节流的形式发送文件。|
|res.sendStatus()       |设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。|

### app.route()

可使用 app.route() 创建路由路径的链式路由句柄。由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误。

        app.route('/book')
            .get(function(req, res) {
                res.send('Get a random book');
            })
            .post(function(req, res) {
                res.send('Add a book');
            })
            .put(function(req, res) {
                res.send('Update the book');
            });

### express.Router

可使用 express.Router 类创建模块化、可挂载的路由句柄。

Router 实例是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”。

        var express = require('express');
        var router = express.Router();
    
        // 该路由使用的中间件
        router.use(function timeLog(req, res, next) {
            console.log('Time: ', Date.now());
            next();
        });
    
        // 定义网站主页的路由
        router.get('/', function(req, res) {
            res.send('Birds home page');
        });
    
        // 定义 about 页面的路由
        router.get('/about', function(req, res) {
            res.send('About birds');
        });
    
        module.exports = router;


## 中间件

> 中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。

中间件的功能包括：

- 执行任何代码。
- 修改请求和响应对象。
- 终结请求-响应循环。
- 调用堆栈中的下一个中间件。

如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。

Express 应用可使用如下几种中间件：

- <a href="#应用级中间件" >应用级中间件</a>
- <a href="#路由级中间件" >路由级中间件</a>
- <a href="#错误处理中间件" >错误处理中间件</a>
- <a href="#内置中间件" >内置中间件</a>
- <a href="#第三方中间件" >第三方中间件</a>

### <span id="应用级中间件">应用级中间件</span>

> 应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()。

如果需要在中间件栈中跳过剩余中间件，调用 next('route') 方法将控制权交给下一个路由。 注意： next('route') 只对使用 app.VERB() 或 router.VERB() 加载的中间件有效。

    // 一个中间件栈，处理指向 /user/:id 的 GET 请求
    app.get('/user/:id', function (req, res, next) {
        // 如果 user id 为 0, 跳到下一个路由
        if (req.params.id == 0) next('route');
        // 否则将控制权交给栈中下一个中间件
        else next(); //
        }, function (req, res, next) {
        // 渲染常规页面
        res.render('regular');
    });
    
    // 处理 /user/:id， 渲染一个特殊页面
        app.get('/user/:id', function (req, res, next) {
        res.render('special');
    });

### <span id="路由级中间件">路由级中间件</span>

> 路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。

需要使用路由中间件 :

    // 将路由挂载至应用
    app.use('/',router);

### <span id="错误处理中间件">错误处理中间件</span>

> 错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： (err, req, res, next)。

    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

#### 缺省错误处理句柄

Express 会默认有一个错误句柄，会捕获任何错误信息，并且会默认放在中间件堆栈的最底端。

如果你向 next() 传递了一个 error ，而你并没有在错误处理句柄中处理这个 error，Express 内置的缺省错误处理句柄就是最后兜底的。最后错误将被连同堆栈追踪信息一同反馈到客户端。堆栈追踪信息并不会在生产环境中反馈到客户端。

    设置环境变量 NODE_ENV 为 “production” 就可以让应用运行在生产环境模式下。

如果你已经开始向 response 输出数据了，这时才调用 next() 并传递了一个 error，比如你在将向客户端输出数据流时遇到一个错误，Express 内置的缺省错误处理句柄将帮你关闭连接并告知 request 请求失败。

### <span id="内置中间件">内置中间件</span>

从 4.x 版本开始，, Express 已经不再依赖 Connect 了。除了 express.static, Express 以前内置的中间件现在已经全部单独作为模块安装使用了。请参考 [中间件列表](https://github.com/senchalabs/connect#middleware)。

express.static(root, [options])
express.static 是 Express 唯一内置的中间件。它基于 serve-static，负责在 Express 应用中提托管静态资源。

可选的 options 参数拥有如下属性。 

|属性	|描述	|类型	|缺省值|
|-------|------|--------|-------|
|dotfiles	|是否对外输出文件名以点（.）开头的文件。可选值为 “allow”、“deny” 和 “ignore”	|String	|“ignore”|
|etag	|是否启用 etag 生成	|Boolean	|true|
|extensions	|设置文件扩展名备份选项	Array	|[]|
|index	|发送目录索引文件，设置为 false 禁用目录索引。|	Mixed	|“index.html”|
|lastModified	|设置 Last-Modified 头为文件在操作系统上的最后修改日期。可能值为 true 或 false。	|Boolean	true|
|maxAge	|以毫秒或者其字符串格式设置 Cache-Control 头的 max-age 属性。	|Number	|0|
|redirect	|当路径为目录时，重定向至 “/”。|	Boolean	|true|
|setHeaders	|设置 HTTP 头以提供文件的函数。	Function	 |

### <span id="第三方中间件">第三方中间件</span>

通过使用第三方中间件从而为 Express 应用增加更多功能。

安装所需功能的 node 模块，并在应用中加载，可以在应用级加载，也可以在路由级加载。

下面的例子安装并加载了一个解析 cookie 的中间件： cookie-parser

## 模板引擎

需要在应用中进行如下设置才能让 Express 渲染模板文件：

- views, 放模板文件的目录，比如： app.set('views', './views')

- view engine, 模板引擎，比如： app.set('view engine', 'jade')

然后安装相应的模板引擎 npm 软件包。