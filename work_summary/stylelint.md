# package.Json里关于stylelint的配置

在package.json文件中，会使用stylelint和其他相关的第三方插件用来检查代码格式和修复。

而stylelint的检查语法是 __stylelint "\*\*/\*.scc"__ 。

但在 scripts 对象里是用 【key value】 的形式书写，value是用双引号包裹。

于是就在双引号里将双引号改成了单引号。

``` javascript
 "scripts"{
    "lint": "./node_modules/.bin/standard && stylelint '**/*.scss'",    
 }  
```

这样会造成的下面的错误：

``` java
 No files matching the pattern "'**/*.scss'" were found.
```

这就是因为 stylelint 的语法错误造成的。

需要用改成：

``` javascript
 "scripts"{
    "lint": "./node_modules/.bin/standard && stylelint \"**/*.scss\"",    
 }  
```

这样就好了。