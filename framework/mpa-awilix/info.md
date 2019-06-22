1. 运用 awilix 和 awilix-koa;

``` javascript
    import { createContainer,  Lifetime } from 'awilix'; 
    import { loadControllers, scopePerRequest } from 'awilix-koa';
```

2. 创建一个IOC的容器，

``` javascript
const container = new createContainer();
```

3. 每一次请求,告诉容器

``` javascript
app.use(scopePerRequest(container));
```

4. 装在所有的service到容器里

```javascript
container.loadModules([__dirname+'/service/*.js],{
    formatName: "camelCase",        //以驼峰命名的方式。
    resolveOptions: {
        lifetime: Lifetime.SCOPED
    }
});
```

5. 自动化装在路由。

``` javascript
.app.use(loadControllers(__dirname+"/routes/*.js",{cwd:__dirname}));
```

6. 改造  services 的js文件，将每一个service改写成一个类。

7. 在 routers 的对应的文件里注入 service 类。通过类继承的方式继承。同时加路由地址和访问方式。

``` javascript
import { route, GET, POST } from 'awilix-koa';

@route("/");            //写上地址 以类的route为根，里面的每个路由都依赖于根路由
@GET()                   //写访问方式有post直接在下面加
//@POST
```

8. 下载解析装饰器的插件  ‘babel-plugin-transform-decorators-legacy’;