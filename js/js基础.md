# JavaScript 基础

[TOC]

> js单线程是为了操作dom

## JS执行机制(ES6)

ES5 只有函数级作用域，ES6有块级作用域。

**ES5的变量提升就是解决没有块级作用域的弊端**

### 变量提升和函数提升

实际上变量和函数声明在**代码里的位置不会改变**，在编译阶段被js引擎放在了内存中。生成了一个全局的上下文。

> 函数的优先级高于变量的优先级，先提升变量，在提升函数。
>
> 变量只会提到函数的最顶的，如果没有函数就提升到window；

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

### 调用栈

执行上下文是存在栈中，js创建执行上下文的一般有三种情况：

1. 当js执行全局代码的时候，会创建一个全局上下文。而且在整个页面的周期中全局上下文只会有一个。
2. 当js调用某个函数的时候，函数体内的代码会被编译，并且会创建一个当前函数的执行上下文。当函数执行完销毁后，当前函数执行上下文也会被销毁。
3. 当使用eval函数的时候，eval代码也会被编译，并创建上下文。



**调用栈**就是管理这些关系的一种数据结构。



每一个执行上下文分为四部分：

1. 变量环境
2. 词法环境(放const,let)
3. outer（作用域链）
4. this

## 作用域

Javascript中的作用域就是词法作用域（事实上大部分语言都是基于词法作用域的）。

### 块级作用域

js因为有变量提升的特性，导致了很多与直觉不相符的代码，为此ES6引入了**块级作用域** 和 `const`、`let`来避免这种设计缺陷。但是为了向下兼容，在执行上下文里入了**词法环境**。在执行上下文中，找变量先找**词法环境**，再找**变量环境**。而因为有`const`和`let`，所以在词法环境是以栈的方式存储，所以有一个**块级作用域栈**。

``` javascript
function foo(){
  var a = 1;
  let b = 2;
  {
    let b = 3;
    var c = 4;
    let d = 5;
    console.log(a);
    console.log(b);
  }
  console.log(b);
  console.log(c);
  console.log(d);
}
foo();
```

流程：

1. 先创建foo的执行上下文。
2. 在执行上下文中，先找`var`，a、c变量在变量环境中
3. 在依次向下编译，而`let`和`const`，放在词法环境中。b变量在词法环境中是以栈的方式存储（块级作用域栈），所以b放在栈底。
4. 到了{}块，则里面的`let`和`const`，会以一起以块级的方式在压入词法环境的块级作用域栈中。
5. 到找b变量时，则是优先找词法环境，并且是从上到下的方式，词法环境找不到则找变量环境。
6. 当块级{}运行完，则在词法环境中弹栈销毁。
7. 所以当查找d时。d报错d is not define。

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

## 作用域链和闭包

**作用域链：** 

每个执行上下文都包含一个外部引用，用来指向外部的执行上下文。我们把这个外部引用叫**outer**（es5 叫scopchain）。当一段代码使用一个变量的时候，会先找自己的执行上下文，没有找到,如果有闭包则找闭包，没有再找外部的执行上下文，然后一直向上找，最后找到全局也就是window。

**闭包：**闭包的原理就是作用域链。闭包叫（closure），存在堆里的。

是内部函数可以访问外部变量，但外层函数不能访问内部变量。换句话说拿到本不该拿的东西。

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

- 没有返回值或者返回的是简单的数据类型 ，this就是对象的实例。

- 如果返回的是对象类型，this就是指那个对象。

- 如果没有使用new，则新建的实例是`undefined`，则构造函数里的this指向全局。

  ```javascript
  this.a = 1000;
  function Test(b){
      this.a = 1;
    	this.b = b;
  }
  Test.prototype.geta = function(){
      alert(this.a);
  }
  var p = new Test(2);
  var s = Test(3);
  
  p.geta();       //1
  console.log(s) // undefined
  this.b = 3;
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

### 箭头函数中的this

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

- call(context,args,arg2..…);
- apply(context, [args,args2..…..]);
- bind(this)

当 context 为 undefined 时，this 就指 window

而 call 和 apply 会立刻执行 ，而bind需要调用才执行。



## 数据类型

> 1. 基本数据类型：number、string、boolean、symbol、bigInt、null、undefined、
> 2. 复合数据类型：object

### 为falsy

只有 6 种 [falsy](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy) 值:

- `undefined`

- `null`

- `NaN`

- `0`

- `''` (empty string)

- `false`

  ```javascript
  0             // false
  new Number(0)  // true
  ('')					 // false
  (' ')						 // true
  new Boolean(false) 	 // true
  undefined					 // false
  ```

## 编译器和解释器

编译型语言为C，C++，Golang，解释型语言为 Python，javascript。

- 编译型语言编译过程：先进行词法分析，语法分析转成AST(抽象语法树)，然后优化代码，在生成机器码。编译成功生成一个可执行的文件（二进制文件）。如果过程中发生错误，则不会生成文件。
- 解释型语言编译过程：先进行词法分析，语法分析转成AST(抽象语法树)，然后生成**字节码**，根据字节码执行。

### V8执行js

1. 先词法分析，语法分析生成**AST**和**执行上下文**。
2. AST通过**解释器（Ignition）**转化成字节码。在这个过程中如果出现**热点码（HotSpot）**比如一段代码重复多次等可以被优化的代码，则后台**编译器（TurboFan）**将这些可以优化的代码编译成机器码。等再次执行时直接使用机器码。
3. 字节码在逐行执行形成机器码，

字节码配合解释器和编译器的技术叫做**JIT**(即时编译)

## 消息队列和事件循环

消息队列：属于一种数据结构，是遵循先进先出的原则。

消息队列包含：输入事件（鼠标事件），微任务，文件读写，WebSocket，JS定时器等，同时还包含页面相关的事件。如JS执行，解析DOM，样式计算，布局计算，CSS动画等。

**页面使用单线程**是因为页面进程执行的任务全部来自于消息队列。

消息队列的任务都叫宏任务，每个宏任务都包含一个微任务队列。而在执行宏任务中，DOM发生了改变，则放在微任务里，继续将宏任务执行完，就不会对其造成影响。

而微任务里的微任务要早于微任务里的宏任务。

当执行动画时，因为某个JS执行的时间过久，占用了动画单帧的时间，就会造成动画卡顿，针对这个情况JS通过回调功能来规避这个问题（**React的fiber原理**），让要执行的JS滞后执行。

**宏任务**是**浏览器**维护的任务，而**微任务**是**V8**维护的任务。

### node的事件循环

事件循环的顺序：

- timers 阶段：这个阶段执行timer（setTimeout、setInterval）的回调

- I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调

- idle, prepare 阶段：仅node内部使用

- poll 阶段：获取新的I/O事件, 适当的条件下node将阻塞在这里

- check 阶段：执行 setImmediate() 的回调

- close callbacks 阶段：执行 socket 的 close 事件回调

> node中的微任务会在各个阶段之间执行。

### promise

- promise的状态一经改变就不能再改。
- `then`和`cache`都返回一个promise。
- `cache`不管在哪都可以获取上层的错误。
- Promise中返回的任意非`promise`的值都会包裹为一个promise。
- promise的`then`和`cache`可以多次调用，但是如果值一旦改变则不管怎么调用都是那个值。
- `then`和`cache`中`return`一个`Error`不会被`cache`捕获。
- `then`和`cache`中传入的是非函数的话会造成值穿透。
- finally返回的是一个Promise，不管resolve还是reject最后都会执行。
- `.all`接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
- `.race`接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。

### async

- 如果在async函数中抛出了错误，则终止错误结果，不会继续向下执行。

- 如果await后面还是一个promise.then或者是一个异步的函数时，await下面一行的代码在**本轮微任务全部结束后在执行**。

  新老版本的区别：

  - 老版本 node 11之前，await下一行代码是等到**本轮微任务队列清空后执行**。
  - 新版本，await 下一行代码当做一个微队列，放入当**前微队列列表中按顺序执行**。

## 函数

### 箭头函数

1. 箭头函数和`bind`生成的新函数没有 prototype，即没有原型。
2. 箭头函数本身的this指向不能改变，但可以修改它要继承的对象的this。
3. 箭头函数的this指向全局，使用 `arguments` 会报未声明的错误。
4. 箭头函数的this指向普通函数时,它的 `argumens` 继承于该普通函数。
5. 用`new`调用箭头函数会报错，因为箭头函数没有`constructor`。
6. 箭头函数不支持`new.target`。
7. 箭头函数不支持重命名函数参数,普通函数的函数参数支持重命名。

### 函数的参数

#### 函数的参数和函数内部的变量同名时，优先级相同

```javascript
var a = 10;
function ss(a){
    alert(a); //因为a是形参，优先级高于 var a; 所以 局部变量a的声明其实被忽略了。
    var a = 20;
}
ss(a);  //10
```

#### 函数参数有默认值

1. 如果参数有默认值,则会在函数初始化的时候形成一个单独的作用域。arguments不会影响参数结果。如果没有则不会形成单独的作用域，arguments会被参数影响。

2. 函数的参数基本类型按值引用，复合类型是按址引用的。

3. 如果对复合参数进行解构并在函数内更改参数的值，则依然会影响复合参数。

   ``` javascript
   const person = {
     name: "Lydia",
     age: 21
   }
   const changeAge = (x = { ...person }) => x.age += 1;
   const changeAgeAndName = (x = { ...person }) => {
     x.age += 1
     x.name = "Sarah"
   };
   changeAge(person);  
   changeAgeAndName();
   console.log(person); // {name: "Lydia", age: 22}
   ```

   

#### 函数调用用字符串模板

> 如果使用标记模板字面量，第一个参数的值总是包含字符串的数组。其余的参数获取的是传递的表达式的值！

``` javascript
function getPersonInfo(one, two, three) {
  console.log(one)
  console.log(two)
  console.log(three)
}

const person = 'Lydia'
const age = 21

getPersonInfo`${person} is ${age} years old`

// one: ["", " is ", " years old"] 
// two: "Lydia" 
// three: 21
```

## 对象

> 除了基本对象外，所有对象都有原型。

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
> 所有对象从Object.prototype继承方法和属性，尽管它们可能被覆盖。
> 例如，其他构造函数的原型将覆盖**constructor**属性并提供自己的**toString()**方法。

### ?. (可选链操作符)

用来自行判断对象中是否有某个属性有则返回，没有则返回`undefined`;

``` javascript
const person = {
	firstName: "Lydia",
	lastName: "Hallie",
	pet: {
		name: "Mara",
		breed: "Dutch Tulip Hound"
	},
	getFullName() {
		return `${this.firstName} ${this.lastName}`;
	}
};
console.log(person.pet?.name); 					// Mara
console.log(person.pet?.family?.name); // undefined
console.log(person.getFullName?.());   // Lydia Hallie
console.log(member.getLastName?.());   // undefined
```



### 类函数

1. 我们可以将类设置为等于其他类/函数构造函数。

## 事件

### 事件执行

1. 默认事件执行是在冒泡阶段，除非设置为捕获。

2. event.target就是指当前事件的对象。

   ``` html
   <div onclick="console.log('div')">
     <p onclick="console.log('p')">
       Click here!
     </p>
   </div>
   <!-- p, div -->
   
   <!--  2    -->
   <div onclick="console.log('div')">
     <button onclick="console.log('button')">按钮</button>
    </div>
   <!--event.target = button -->
   ```

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

### CommonJS

1. `import` 是代码在编译的时候就执行，所以被导入的模块先执行，而 `require()` 是在代码运行时根据需要加载依赖。

   ``` javascript
   // index.js
   console.log('running index.js');
   import { sum } from './sum.js';
   console.log(sum(1, 2));
   
   // sum.js
   console.log('running sum.js');
   export const sum = (a, b) => a + b;
   
   // 'running sum.js' 'running index.js' 3;
   // require()
   // 'running index.js' 'running sum.js' 3;
   ```

2. import * as name 语法。

   ``` javascript
   // module.js 
   export default () => "Hello world"
   export const name = "Lydia"
   
   // index.js 
   import * as data from "./module"
   
   console.log(data)
   // { default: function default(), name: "Lydia" }
   ```

   `data`对象具有默认导出的`default`属性，其他属性具有指定exports的名称及其对应的值。

## .的运算符优先

var a = {n:1};
a.x = a = {n:2};
console.log(a.x) // undefined

