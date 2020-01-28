# JavaScript 基础

> js单线程是为了操作dom

## 作用域

es5 只有函数级作用域

> 变量只会提到函数的最顶的，如果没有函数就提升到window；

> Javascript中的作用域就是词法作用域（事实上大部分语言都是基于词法作用域的）。

### try,with会延长作用域。

```javascript
let a = 1;
try{
    throw 1;
}catch(a){
    alert(a)
}
```

with(obj)  如果obj里没有的,会变成全局变量,有的才会改变；

```javascript
var obj = {a:1};
width(obj){
    obj.b = 2;
}

console.log(obj.b)   //undifined;
```

### 变量提升和函数提升

> 函数的优秀级比变量的优先级高；

1. 函数声明会被提升 而函数表达式= 变量；

   ```javascript
   a();  // 1;
   function a (){console.log(1)};
   var a = function(){console.log(2)};
   ```

2. es6中 `const` 和 `let` 也会提升，但是它们不会被*初始化*，所以在我们声明（初始化）前不能调用，这也是说的暂时性死区。当我们在声明前调用会报错 <span style="color:red">`ReferenceError`</span>。

   ``` javascript
   function sayHi() {
     console.log(name)
     console.log(age)
     var name = 'Lydia'
     let age = 21
   }
   
   sayHi()
   ```

### 函数的参数和函数内部的变量同名时，优先级相同

```javascript
var a = 10;
function ss(a){
    alert(a); //因为a是形参，优先级高于 var a; 所以 局部变量a的声明其实被忽略了。
    var a = 20;
}
ss(a);  //10
```

### 函数参数有默认值

1. 如果参数有默认值,则会在函数初始化的时候形成一个单独的作用域。arguments不会影响参数结果。如果没有则不会形成单独的作用域，arguments会被参数影响。
2. 函数的参数是按址引用的。

## 闭包

> 闭包是内部函数可以访问外部变量，但外层函数不能访问内部变量。换句话说拿到本不该拿的东西。

```javascript
function test(){
    var k = 1000;
    return function(){
        return k
    }
}
var a = test()();
console.log(a) //  1000;
```

> 闭包里有eval with try 变量不会被回收。

    function test(){
        var k = 1000;
        return function(){
            eval(""); //k是不会被收回
        }
    }

## this

> this 指向函数执行时的当前对象也就是谁调用的就指谁

### 普通函数中

- 严格模式下指 undefined
- 非严格模式下指 window

### 构造函数

- 没有返回值或者返回的是简单的数据类型 this就是对象的实例
- 如果返回的是对象类型，this就是指那个对象，

    ```javascript
    this.a = 1000;
    function test(){
        this.a = 1;
    }
    test.prototype.geta = function(){
        alert(this.a);
    }
    var p = new test;
    p.geta();       //1
    ```

### 对象函数中

>this只对象本身。

```javascript
var obj = {
    name: 'js',
    init:function(){
        console.log(this)  // obj
    }
}
```

### 闭包里的this

> 指的是window

```javascript
this.a = 1000;
obj={
    a: 100,
    test: function(){
        alert(this.a);
        return function(){
            alert(this.a);
        }
    }
}
obj.test()();   // 1000
------------------------------
var t = obj.test();
t();                // 1000
```

### 箭头函数

> 箭头函数指向父级的this，也就是bind父级的this。

```javascript
this.a = 30;
var obj = {
    a: 30,
    init: ()=>{
        alert(a) // 30
    }
}
obj.init();
```

### 改变this指向

- call(context,args,arg2...);
- apply(context, [args,args2.....]);
- bind(this)

当 context 为 undefined 时，this 就指 window

而 call 和 apply 会立刻执行 ，而bind需要调用才执行。

## 面向对象

### 创建对象三种模式

1. 单体模式

```js
var obj = {
  name: 'sss',
  showName:function(){
    return this.name;
  }
}
```

2. 原型模式- 属性放在构造函数里 方法放在原型上

```js
  function Teach (name,cccc){
    this.name = '111'
  }

  Teach.prototype.showName = function(){
    return this.name;
  }
```

3. 类模式

```js
 class Teach{
    constructor(name,age){
      this.name = 'name';
      this.age = 14;
    }
    showName(){
      return this.name;
    }
  }
```

### 继承

1. 对象继承

```js
   var Teacher = {
     name: 'ddd',
     age:14,
     showName: function(){
       return this.name;
     }
   }

  var student  = Object.create(Teacher);
  student.name = 'xxxx';
  student.age = 17;
  student.showJob = function(){
    return student.job;
  }
```

2. 原型链继承

```js
function Person(name,age){
    this.name = name;
    this.age = age;
}

Person.prototype.showName = function(){
    return this.name;
}

function Tea(name,age,job){
    Person.call(this,name,age);
    this.job = job;
}

Tea.prototype.showJob = function(){
    return this.job;
}

Tea.prototype = new Person();
Tea.prototype.constructor = Tea;

var stu2 = new Person('xxx',16,'bbbb');
var stu = new Tea('ddd',13,'vvvv');
console.log(Tea.prototype.constructor);
```

3. es6类继承

```js
  class Person{
    constructor(name,age){
      this.name = name;
      this.age = age;
    }
      
    showName(){
      return this.name;
    }
      
    showAge(){
      return this.age;
    }
      
  }

  class Tea extends Person{
    constructor(name,age,job){
      super(name,age);
      this.job = job;
    }
      
    showJob(){
      return this.job + this.name+super.showAge();
    }
      
  }
```

### Object 实例和Object 原型对象

> JavaScript中的所有对象都来自**Object**；
> 		所有对象从Object.prototype继承方法和属性，尽管它们可能被覆盖。
> 		例如，其他构造函数的原型将覆盖**constructor**属性并提供自己的**toString()**方法。



## label : statement

> 标记语句可以和 break 或 continue 语句一起使用。标记就是在一条语句前面加个可以引用的标识符。

- label 任何不适是保留关键字的javascript标识符。
- statement 语句。
- break可用于任何标记语句。而continue可用于循环标记语句。

### 描述

可使用一个标签来唯一标记一个循环，然后使用 break 或 continue 语句来指示程序是否中断循环或继续执行。

需要注意的是 JavaScript 没有 goto 语句，标记只能和 break 或 continue 一起使用。

在严格模式中，你不能使用“let”作为标签名称。它会抛出一个SyntaxError（let是一个保留的标识符）。

### 示例

- for 循环中使用带标记。continue

    ```javascript
var i, j;
    
    loop1:
    for (i = 0; i < 3; i++) {      //The first for statement is labeled "loop1"
        loop2:
        for (j = 0; j < 3; j++) {   //The second for statement is labeled "loop2"
            if (i == 1 && j == 1) {
                continue loop1;
            }
            console.log("i = " + i + ", j = " + j);
        }
}
    
    // Output is:
    //   "i = 0, j = 0"
    //   "i = 0, j = 1"
    //   "i = 0, j = 2"
    //   "i = 1, j = 0"
    //   "i = 2, j = 0"
    //   "i = 2, j = 1"
    //   "i = 2, j = 2"
    // Notice how it skips both "i = 1, j = 1" and "i = 1, j = 2"
    ```

## 模块化

- AMD
- CMD
- commonjs
- UMD

### 语法

```javascript
import {$} from 'jqueryjs';   // es6
var $ = require('jquery.js)['$'];   //amd

export {$};    //es6
export.$ = $; //amd
```

## .的运算符优先

var a = {n:1};
a.x = a = {n:2};
console.log(a.x) // undefined

