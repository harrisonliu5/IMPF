# IoC 依赖注入mpa 框架搭建

## 流程

1. 使用ts，要使用ioc就要先使用 interface。只需要接口的名字，不管怎么实现的。

2. 下载inversify库。  npm install inversify inversify-koa reflect-metadata --save;

3. 创建 tsconfig.json

``` json
{
    "compilerOptions": {
        "target": "es5",
        "lib": ["es6"],
        "types": ["reflect-metadata"],
        "module": "commonjs",
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

-----------------------------------------------------------------------------------

## inversify 的使用

1. 创建 services 类

``` javascript

class Katana {
    hit() {
        return "cut!";
    }
}

class Shuriken {
    throw() {
        return "hit!";
    }
}

class Ninja {
    constructor(katana, shuriken) {
        this._katana = katana;
        this._shuriken = shuriken;
    }
    fight() { return this._katana.hit(); };
    sneak() { return this._shuriken.throw(); };
}
```

2. 定义 TYPES 常量对象

``` javascript

var TYPES = {
    Ninja: "Ninja",
    Katana: "Katana",
    Shuriken: "Shuriken"
};

```

3. 将需要的注入的类标记并和TYPES的常量对象关联

``` javascript
var inversify = require("inversify");
require("reflect-metadata");
// 将类标记为可注入的
inversify.decorate(inversify.injectable(), Katana);
inversify.decorate(inversify.injectable(), Shuriken);
inversify.decorate(inversify.injectable(), Ninja);
// 和TYPES相关联
inversify.decorate(inversify.inject(TYPES.Katana), Ninja, 0);
inversify.decorate(inversify.inject(TYPES.Shuriken), Ninja, 1);
```

4. 创建ioc容器，并将定义好的类绑定到容器

``` javascript
import { Container } from "inversify";
const  container = new Container();
container.bind(TYPES.Ninja).to(Ninja);
container.bind(TYPES.Katana).to(Katana);
container.bind(TYPES.Shuriken).to(Shuriken);
```

5. 直接使用实例

``` javascript
let ninja = container.get(TYPES.Ninja);
return ninja;
```

### 使用装饰器

1. 使用provide

``` javascript
@provide(TYPES.Katana)
class Katana {
    hit() {
        return "cut!";
    }
}
@provide(TYPES.Shuriken)
class Shuriken {
    throw() {
        return "hit!";
    }
}
@provide(TYPES.Ninja)
class Ninja {
    constructor(katana, shuriken) {
        this._katana = katana;
        this._shuriken = shuriken;
    }
    fight() { return this._katana.hit(); };
    sneak() { return this._shuriken.throw(); };
}
// 自动找 provide 装饰器 而不找 injectable 装饰器
container.load(buildProviderModule());
```

2. 或者使用 injectable

``` javascript
@injectable()
class Katana {
    hit() {
        return "cut!";
    }
}
@injectable()
class Shuriken {
    throw() {
        return "hit!";
    }
}

var container = new Container();
container.bind<Katana>("Katana").to(Katana);
container.bind<Shuriken>("Shuriken").to(Shuriken);
```

3. 当controller需要依赖注入时

``` javascript
// 需要一个新的装饰器
let provideController = function(identifer,name){
    return fluentProvide(identifer)
    .whenTargetNamed(name)
    .done()
}
// 使用
// @provideController(TYPE.Controller,"IndexController")

```

4. 最后使用时

``` javascript
import * as  bodyParser from "koa-bodyparse";
import { controller, interfaces, TYPE, InversifyKoaServer } from 'inversify-koa-utils';

let server = new InversifyKoaServer(container);

server.setConfig(app => {
    app.use(bodyParser());
});

let app = server.build();
app.listen(3000);

```