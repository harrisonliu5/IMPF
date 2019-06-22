# webpack

## 模块化

模块化是一种将系统分离成独立功能部分的方法，严格定义模块接口、模块间具有透明性。

### 模块方式

- Commomjs
- AMD
- CMD

### 模块化的价值

建立模块化的标准，能够管理模块之间的依赖，从而提升代码的可维护性和复用性

高内聚，低耦合

## loader

原理: 把文件转成字符串,然后在转成 AST静态语法树，然后分析语法树。
 
loader 是从后往前执行，第一个是最后一个执行。

 用于 AST acorn acorn-walk

``` javascript
//前置的钩子
 module.exports.pitch = function(rRquest,pRequest,data){
     data.value = "ddd"
   }
   // 前置钩子先执行在执行loader 
```

## plugin

实现插件机制的大体方式
创建-webpack在内部对象上创建各种钩子。
注册-插件将自己的方法注册到对应钩子上
调用-在编译过程中，会适时地触发相应钩子，因此也就触发插件的方法

```javascript
class ConsoleLogOnBuildWebpackPlgin{
    app(compiler){
        compiler.hooks.run.tap(pluginName,compilation=>{
            console.log('构建开始')
        })
    }
}
```

compiler(所有的构建) - compilation (每一次构建)extends tapable(订阅发布)
