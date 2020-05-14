# 前端知识总结

[TOC]



## HTML

### __HTML 语义化__

- 使用div布局，但不要过多的用div包裹无意义的内容。
- 尽量少使用无意义的 div 和 span ，语义不明显时多使用p。
- 需要强调，使用 strong 和 em ，不使用 b 和 i 。
- 使用表格时，标题要加 caption ，表头用 thead ，主体用 tbody ，底部用 tfoot。

### __同源政策__

- 协议相同
- 域名相同
- 端口相同  *(默认端口80)*
>浏览器不同域名不能相互访问 cookie ,但是内部提交表单不受限制。

1. 限制范围
    1. Cookie、LocalStorage、IndexDB。
    2. DOM无法获取。
    3. AJAX不能发送。

2. 如何设置同源策略(前端跨域几种方式)
    1. host
        将子域和主域的document.domain设为同一个主域.前提条件：这两个域名必须属于同一个基础域名! 而且所用的协议，端口都要一致，否则无法利用document.domain进行跨域.

        ``` javascript
            //text.xxx.com/a.html
            <script>
                document.domain = 'xxx.com'; //设置同源
                document.cookie = 'text1=hello';
            </script>

            //text2.xxx.com/b.html
            <script>
                document.cookie
            </script>
        ```

    2. jsonp

    3. img(代码压缩进图片)

    4. websocket

    5. postMessage;(Communication)

        postMessage()方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递.

        postMessage(data,origin)方法接受两个参数.

        1. data:要传递的数据.
        2. origin:字符串参数，指明目标窗口的源，协议+主机+端口号[+URL]，URL会被忽略，所以可以不写，这个参数是为了安全考虑，postMessage()方法只会将message传递给指定窗口，当然如果愿意也可以建参数设置为"*"，这样可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

        ``` javascript
        // 发送消息
        otherWindow.postMessage('消息’,'http://www.baidu.com');

        // 接受消息
        window.addEventListener('message',function(e){
                // e里面有三个参数
                e.data //从其他 window 中传递过来的对象。
                e.origin //调用 postMessage  时消息发送方窗口的 origin . 请注意，这个 origin 不能保证是该窗口的当前或未来origin，因为postMessage被调用后可能被导航到不同的位置。
                e.source //对发送消息的窗口对象的引用; 您可以使用此来在具有不同origin的两个窗口之间建立双向通信。

            },false);
        ```

        >这不能低估：无法检查 origin 和 source 属性会导致跨站点脚本攻击。

    6. cors(cross-origin sharing standard )
        服务器端对于CORS的支持，主要就是通过设置Access-Control-Allow-Origin来进行的。如果浏览器检测到相应的设置，就可以允许Ajax进行跨域的访问。

        cors把请求分为了 __简单请求__ 和 __复杂请求__.
        1. 简单请求：
            - GET、POST、HEAD。
            - 请求头字段必须包含在以下：Accept Accept-Language Content-Language Content-Type DPR Downlink Save-Data Viewport-Width Width。
            - 请求头中包含 Content-Type 的时候, 其值必须为 text/plain multipart/form-data application/x-www-form-urlencoded(这个是 form 提交默认的 Content-Type)  三者中的一个。

### Web storage

1. LocalStorage 和 sessionStorage
2. 离线储存(__manifest__)

``` html
<!DOCTYPE HTML>
<html manifest = "cache.manifest">
...
</html>
```

``` javascript
//cache.manifest
CACHE MANIFEST
#v0.11
CACHE:
js/app.js
css/style.css

NETWORK:
resourse/logo.png

FALLBACK:
/ /offline.html
```
#### manifest一般由三个部分组成:

1. CACHE:表示需要离线存储的资源列表，由于包含manifest文件的页面将被自动离线存储，所以不需要把页面自身也列出来。

2. NETWORK:表示在它下面列出来的资源只有在在线的情况下才能访问，他们不会被离线存储，所以在离线情况下无法使用这些资源。不过，如果在 CACHE 和 NETWORK 中有一个相同的资源，那么这个资源还是会被离线存储，也就是说 CACHE 的优先级更高。

3. FALLBACK:表示如果访问第一个资源失败，那么就使用第二个资源来替换他，比如上面这个文件表示的就是如果访问根目录下任何一个资源失败了，那么就去访问offline.html。

### Web Workers

- 一个 worker 就是 Worker(), worker 在与当前 window不同的另一个全局上下文中运行。这个上下文由专用 worker 的情况下的一个 DedicatedWorkerGlobalScope 对象表示(标准 workers 由单个脚本使用; 共享 workers 使用 SharedWorkerGlobalScope )。
- Web Workers 不能直接访问 Web 页面 和 DOM API。
- Workers 和 主线程直接通过 onmessage 收消息， postMessage 发消息，互相通信。

### H5新的API

- Media API
- Text Track API
- Application Cache API
- User Interaction
- Data Transfer API
- Command API
- Constraint Validation API
- History API

### 补充

1. Doctype作用
    1. !DOCTYPE> 声明位于文档中的最前面，处于 <html> 标签之前。告知浏览器以何种模式来渲染文档。

    2. 严格模式的排版和 JS 运作模式是 以该浏览器支持的最高标准运行。

    3. 在混杂模式中，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以防止站点无法工作。

    4. DOCTYPE不存在或格式不正确会导致文档以混杂模式呈现。

    5. Doctype文档类型
        该标签可声明三种 DTD 类型，分别表示严格版本、过渡版本以及基于框架的 HTML 文档。

        HTML 4.01 规定了三种文档类型：Strict、Transitional 以及 Frameset。

        XHTML 1.0 规定了三种 XML 文档类型：Strict、Transitional 以及 Frameset。

        Standards （标准）模式（也就是严格呈现模式）用于呈现遵循最新标准的网页，而 Quirks

## Css

### BFC、IFC、GFC、FFC

1. __BFC__ 块级元素渲染(Block Formatting Context)
    > 两个BFC之间是相互独立的，不重叠。

    > 父级元素是BFC那么内部浮动元素参与计算。

    __会生成BFC的元素:__
    1. 根元素。
    2. float 属性不为 none 。
    3. position属性为 absolute 或者 fixed。
    4. display 为 inline-block、table-cell、table-caption、flex、inline-flex。
    5. overflow 不为 visible。

2. __IFC__ 内联格式化上下文(Inline Formatting Context)
    >高度是根据内部元素最高的撑开，不受竖直方向的padding 和 margin 的影响。
    会生成为inline-level box:display 属性为 inline, inline-block, inline-table 的元素 。

3. __GFC__ 网络布局格式化上下文(GridLayout Formatting Context)
    >当 display 设置为 grid 的时候，元素获取了一个独立的渲染区域。
    我们可以通过在网格容器(grid container)上定义网格定义行(grid definition rows)和网格定义列(grid definition columns)属性各在网格项目(grid item)上定义网格行(grid row)和网格列(grid columns) 为每一个网格项目(grid item)定义位置和空间。

4. __FFC__ 自适应格式上下文(Flex Formatting Context)
    >当 display 设置成 flex 或者 inline-flex 时产生。
    display值为flex或者inline- flex的元素将会生成自适应容器(flex container)。

### OO CSS

OO CSS 将页面可重用元素抽象成一个类，用Class加以描述，而与其对应的HTML即可看成是此类的一个实例。

指导思想[OOCSS](http://oocss.org)

- [reset.css](http://meyerweb.com/eric/tools/css/reset/)

- [normalize.css](https://necolas.github.io/normalize.css/)

- [neat.css](http://www.neatcss.com/)

  Neat.css 结合了Reset.css 和 Normalize.css;

  - 作用
    1. 加强代码复用以方便维护。
    2. 减少CSS体积。
    3. 提升渲染效率。
    4. 组件库思想、栅格布局可共用、减少选择器、方便扩展。
  - 注意事项
    1. 不要直接定义子节点，应把共性声明放到父类。
    2. 结构与皮肤相分离。
    3. 结构与内容相分离。
    4. 抽象出可重用的元素，建好组件库，在组件库内寻找可用的元素组装页面。
    5. 往你想扩展的对象本身增加class而不失他的父节点。
    6. 对象应保持独立性。
    7. 避免使用ID选择器，权重太高，无法重用。
    8. 避免位置相关的样式。
    9. 保证选择器相同的权重。
    10. 类名 简单 清晰 语义化 OOCSS 的名字并不影响HTML语义化。

### css处理器

1. __css预处理器__

    Less Sass

2. __css后处理器__
    - css 压缩 clean-css
    - 自动添加浏览器前缀 autoprefixer 。可以用webpack 或者 gulp 进行编译。
    - css更加美观的排序 CSScomb
    - Rework 取代 stylus 后处理器发热
    - 前后通吃 PostCss

3. __POSTCSS__
    浏览器原生支持
    POST Next 是浏览器兼容的

    1. css变量
        - 定义css变量  --mouse-x: 0.1
        - 使用css变量  var(--mouse-x)
        - css 变量结合 calc 计算公式  
            left: calc(1000px * var(--mouse-x));
        - 全局变量 :root{ --height: 100px;}

### CSS 分层

为什么分层：
- 有助于扩展性，性能的提升和代码组织的管理。
- 可以让团队统一命名规范，方便维护。

__分层方式：__

1. SMACSS

    可扩展的模块化架构的css，像oocss一样以减少重复样式为基础，使用一套五个层次来划分css：

    1. Base - 设定标签元素的预设值。如 html,h1,h2等。
    2. layout - 网站的大结构外观。如 header,top,footer等。
    3. module - 应用不同的模块。如 button，input等。
    4. State - 定义状态。 如 active等。
    5. Theme - 主题。 如 border-color, background-color等。

    修饰符使用--，子模块使用__符号。有语义化则使用-。

    ~~~html
    <div class="container">
        <div class="container-header">
            <div class="container-header__title">
                <h1 class="container-header__title--home"></h1>
            </div>
        </div>
    </div>
    ~~~

2. BEM

    比如一个选项卡导航是一个快(Block)，里面的一个元素是一个标签(Element)，而当前的选项卡是一个状态(Modifier);

    - block - 代表了更高级别的抽象或者组件。
    - block__element - 代表 block 的后代。
    - block--modifier - 代表 block 的不同状态或者版本。
    - 修饰符使用的是-，子模块使用的是__符号。

    ~~~ html
    <div class="menu">
        <li class="menu__item"></li>
        <li class="menu__item_state_current"></li>
        <li class="menu__item"></li>
    </div>
    ~~~

3. Suit

    Suit 起源 BEM ，但是用驼峰命名和连字符把组件从他们的修饰符和子孙后代中区分出来。

    - 修饰符是--，子模块使用__符号。

    ~~~ css
        .ComponentName{}
        .ComponentName--modifierName{}
    ~~~

4. ACSS

    atoms -> molecules -> organisms -> templates -> pages

    ~~~ css
    .m-10{
        margin:10px;
    }
    ~~~

5. ITCSS
    - Settings - 全局可用配置
    - Tools - 通用工具函数
    - Generic - 通用基础样式
    - Base - 未归类的HTML元素
    - Objects - 设计部分使用的专类
    - Components - 符合自己的组件的
    - Trumps - 重写只影响一块DOM

### CSS Modules

​	[CSS Modules](https://blog.csdn.net/xiangzhihong8/article/details/53195926)

### CSS矩阵
主要用在 transform 

依靠矩阵的CSS库

[css-doodle](https://css-doodle.com)

### 布局

1. 双飞翼布局
    1. position;
    2. float
    3. 负边距
    4. 等高
    5. 盒子模型
    6. 清除浮动

2. [FLEX](http://www.runoob.com/w3cnote/flex-grammar.html)

3. [Grid layout](https://kb.cnblogs.com/page/178444/)

### ICON-FONT 

1. [__阿里字体__](http://iconfont.cn/home)  
2. [__cssicon__](https://cssicon.space/#/)  纯css做的图标。

    - no-image时代 纯色不超过2的图像。
    - 不要写中文字体名字,保证西文字体在中文字体前面。mac>linux>window;
    - font-family: sans-serif;系统默认，字体多个单词组成加引号。

### CSS 解析原理__;

​	[css 解析原理移步](https://blog.csdn.net/wGL3k77y9fR1k61T1aS/article/details/78635528)

### 补充

1. vh vw
    vh vw 代表浏览器的宽度和高度除以100 ;
2. 重绘和重排
    1.重排必定会造成重绘(如下条件都会造成重排)
        a、添加或者删除可见的DOM元素
        b、元素位置改变
        c、元素尺寸改变 
        d、元素内容改变(例如:一个文本被另一个不同尺寸的图片替代) 
        e、页面渲染初始化(这个无法避免)
        f、浏览器窗口尺寸改变
    2.如果DOM变化仅仅影响的了背景色等等非几何属性 此时就发生了重绘(repaint)而不是重排 因为布局没有发生改变
    3.开启动画加速的元素为什么就不会引起重排是因为合成过程有GPU参与，而相当于动画是映射到网格中从而不引起重排。

## JS

### 基础

#### 原型与原型链
1. 所有的引用类型(数组、对象、函数)，都具有对象特性，即可自由扩展属性(null除外)。

2. 所有的引用类型(数组、对象、函数)都有一个__proto__属性，属性值是一个普通的对象。

3. 所有的函数，都有一个prototype属性，属性值也是一个普通的对象。

4. 所有引用类型(数组、对象、函数)__proto__属性值指向它的构造函数的prototype属性值 

5. __proto__(隐式原型)与prototype(显式原型)

   实例.__proto__ = 类函数.prototype;
   类函数.prototype.constructor = 构造函数。
   构造函数.prototype = 类函数.prototype;
   构造函数.__proto__ = Function类.prototype;

   类函数.prototype.__proto__ = Object类.prototype;

   Object函数.prototype = object类.prototype;
   object类.prototype.constructor = Object函数。
   new Object.__proto__ = Object类.prototype;

   Object函数.__proto__ = Function类.prototype;

   __Function函数.prototype = Function类.prototype;__
   __Function类.prototype.constructor = Function函数__
   Function函数.__proto__ = Function类.prototype;

#### 作用域

1. es5 只有函数级作用域
    > 变量只会提到函数的最顶的，如果没有函数就提升到window；
    > Javascript中的作用域就是词法作用域（事实上大部分语言都是基于词法作用域的）。

2. try,with,eval会延长作用域。

    ``` javascript
    let a = 1;
    try{
        throw 1;
    }catch(a){
        alert(a)
    }
    ```
    with(obj)  如果obj里没有的,会变成全局变量,有的才会改变；

    ``` javascript
    var obj = {a:1};
    width(obj){
        obj.b = 2;
    }

    console.log(obj.b)   //undifined;
    ```
3. 变量提升和函数提升
    > 函数的优秀级比变量的优先级高；

    函数声明会被提升 而函数表达式= 变量；
    ``` javascript
    a();  // 1;
    function a (){console.log(1)};
    var a = function(){console.log(2)};

    // 函数的参数和函数内部的变量同名时，优先级相同；

    var a = 10;
    function ss(a){
        alert(a); //因为a是形参，优先级高于 var a; 所以 局部变量a的声明其实被忽略了。
        var a = 20;
    }
    ss(a);  //10
    ```
4. 块级作用域
    ``` javascript
    for(var i = 0;i<5;i++){
    var num = 2; //let 
    }

    console.log(num);
    ```

#### this

> this 指向函数执行时的当前对象也就是谁调用的就指谁

1. 普通函数中
    - 严格模式下指 undefined
    - 非严格模式下指 window

2. 构造函数
    - 没有返回值或者返回的是简单的数据类型 this就是对象的实例
    - 如果返回的是对象类型，this就是指那个对象，

    ``` javascript
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

3. 对象函数中
    >this只对象本身。

    ``` javascript
    var obj = {
        name: 'js',
        init:function(){
            console.log(this)  // obj
        }
    }
    ```
4. 闭包里的this
    > 指的是window

    ``` javascript  
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
    var t = obj.test(); 
    t();                // 1000
    ```

5. 箭头函数
    > 箭头函数指向父级的this，也就是bind父级的this。

    ``` javascript
    this.a = 30;
    var obj = {
        a: 30,
        init: ()=>{
            alert(a) // 30
        }
    }
    obj.init();
    ```

6. 改变this指向
    - call(context,args,arg2...);
    - apply(context, [args,args2.....]);
    - bind(this)

    当 context 为 undefined 时，this 就指 window

    而 call 和 apply 会立刻执行 ，而bind需要调用才执行。

#### 闭包

> 闭包是内部函数可以访问外部变量，但外层函数不能访问内部变量。换句话说拿到本不该拿的东西。

``` javascript
    function test(){
        var k = 1000;
        return function(){
            return k
        }
    }
    var a = test()();
    console.log(a) //  1000;

    //闭包里有eval with try 变量不会被回收。

    function test(){
        var k = 1000;
        return function(){
            eval(""); //k是不会被收回
        }
    }
```

#### js事件机制

1. 同步队列和异步队列
2. 异步队列分宏队列和微队列

    碰到 setTimeout,promise.then,事件委托，放在异步队列里，异步队列是先进先出的原则。

    而promise.then是放在微队列里。
    等每一次宏队列执行完后在执行微队列

#### 堆和栈(GO,AO,VO)

1. 堆

    堆通常是可以被看做一个树的数组对象，存的是对象，从低位向高位增长，效率比栈低。

    内存 js申请但是浏览器的引擎帮你申请的。

2. 栈

    栈,特性就是先进后出.
    栈里存的是函数里的基础变量，从高位向低位压栈。
    只有8兆。

3. js执行流程

    1. 全局 GO ->globalContext

        全局执行上下文 globalContext === window

    2. 变量对象VO -> Variable Object

        是执行上下文的特殊对象，用来存储上下文的函数声明，函数形参和变量。

        {
            1.函数声明,
            2.变量声明,
            2.函数的形参
        }

    3. 活动对象AO -> Active Object

        是函数上下文中的变量对象.是函数动态创建出来的。

        {
            1.内部的arguments
            2.内部定义的函数
            3.绑定上下文的环境变量
            4.内部定义的变量
        }

    4. 执行栈

        ``` javascript
            fun2(){
                console.log(2);
            }
            fun1(){
                console.log(1);
                fun2()
            }
            fun1();
        ```

        1.js执行首先程序会创建 GO(globalContext)。

        2.每执行一个函数会创建一个可执行上下文EC(Execution Context)。

        3.有一个全局执行上下文栈 Execution Context Static(ECS)，将执行的函数压入栈中; 先执行的压在底下。
        先进后出

        ECS=[
            fun2,
            fun1,
            globalContext:{
                VO:global,
                scope:[globalContext.VO],
                this:globalContext.VO
            }
        ]

        4.AO对象分两个阶段
        创建阶段：变量提升,值都是undefined。

        fun1ExecutionContext = {
            AO:{
                fun2:undefined
            },
            this:undefined,
        }

        执行阶段：
            按照函数的执行上下文进行执行。

            fun1ExecutionContext = {
                AO={
                    argument:{
                            length:0
                        },  
                    fun2:<function>
                },
                scopeChain:[AO,globalContent.VO]
                this: {}
            }

        5.VO就是函数上下文的链接，AO是函数自带的。

    5. 总结

        js 同步执行栈，异步执行队列。队列有优先级。
        队列->先进先出。

        函数调用->创建AO->执行->压栈->弹栈，
        函数不执行不压栈。

#### 垃圾回收(内存泄露)

主要是基于分代式垃圾回收机制。
V8内存分为新生代和老生代两代。

新生代为存活时间较短对象，老生代中为存活时间较长的对象。

1. 新生代

    新生代主要通过 scavenge算法，在具体实现通过采用cheney.cheney是一种采用复制的方法实现的垃圾回收算法。

    它将内存一份为二，每个空间叫semispace。一个处于使用，一个处于闲置。使用的叫from，闲置的为to。

    先全部进from，存活的赋值到to，非存活的被释放，然后互换位置，再次进行回收，发现被回收过的直接到老生代，或者to的空间使用超过25%。
    缺点是只能使用堆内存的一半，是一个空间换时间的办法。

2. 老生代

    主要用Mark-sweep和 Mark-compact.

    Mark-sweep是编辑清除，标记需要释放的对象，然后清除。但是清除完后内存不连续，然后用Mark-compact,将活着的对象移动到一半，移动完后，直接清理边界外的内存。V8后续还引入了延迟出来，增量处理，并计划引入并行标记处理。

8. 值类型和引用类型
    1. 值类型是基础类型：Number,Null,Undefined,Boolean, String，存在栈内存中。
    2. 引用类型：Object包括 Date,Array,Function，存在堆内存中。在参数传递方式上，值类型是按值传递，引用类型是按共享传递（指针）。
    3. 函数的参数是按值传递的，就算传的是Object类型的也是引用的是外面变量的值的地址，但如果内部重写了参数，则内部是引用新的地址和外面无关。

### 设计模式

1. 面向对象(oop) (es5 es6)
2. 函数式编程

    1. 函数式编程起源是范畴论的数学分支。

        1.函数式一等公民。
        是函数与其他数据类型一样
        函数式编程里变量不能被修改，所有的变量只能被赋值一次
        2.函数只用表达式，不用语句 （if）
        3.没有副作用
        4.不修改状态

    2. 范畴

        > 范畴就是一个类或者一个集合。里面有成员和态射。

        范畴成员之间的关系叫做"态射"。
        同一个范畴的所有成员，就是不同状态的"变形。
        可以通过"态射"，一个成员可以变形成另一个成员。

        范畴可以当做一个容器，里面有值和变形关系。

        值：value，
        态射：函数。

        ``` javascript

            class Category{                         //范畴-容器
                constructor(val){
                    this.val = val;                   //成员-值
                }
                add(x){                               //态射-函数
                    return x+1;
                }
            }
        ```
        
3. 纯函数
    
    本质上，函数式编程只是范畴论的运算方法，跟数理逻辑、微积分、行列式是同一类东西，都是数学方法。
    
    所以需要纯的，不能有副作用，因为函数运算原始目的就是求值。输入值 输出一个新值，没有其他作用。
    
    不仅可以有效降低系统的复杂度，还有很多很棒的特性，比如可缓存性。
    
    函数组合:一个需要经过多个函数变成另一个值，就可以把中间所有步骤合并成一个函数。这个叫函数合成。
    
        ``` javascript
            const compose = (f,g)=>x=>f(g(x));
            const compose = function(f,g){
                return function(x){
                    return f(g(x));
                }
        }
    
        a -(f)- b -(g)- c-(h)- d
    
            compose(f,compose(g,h)) = compose(compose(f, g), h) = compose(f, g, h)
    ```
    
4. 柯里化
    
    f(x)和g(x) 合成 f(g(x)),有一个前提，就是f和g只能接受一个参数。
    
    所以柯里化就是把一个多参数的函数转化为单参数的函数。
    
            var checkage = min => age => age > min;
            var result = checkage(18);
        result(20)
    
    事实上柯里化是一种“预加载”函数的方法，通过传递较少的参数， 得到一个已经记住了这些参数的新函数，某种意义上讲，这是一种 对参数的“缓存”，是一种非常高效的编写函数的方法
    
5. 纯度和幂等性
    
    幂等性是执行无数次后还具有相同的效果，同一的参数运行一次函数应该与连续两次结果一直。幂等性在函数编程里和纯度有一定的相关。但有不一致。
    
6. Point Free
    
    把一些对象自带的方法转化成纯函数,不要命名转瞬即逝的中间变量。
    
        const f = str => str.toUpperCase().split(' ');
    
    可以减少不必要的命名，保持代码的简洁和通用。
    
7. 声明式与命令式代码
    
    命令式代码的意思就是，我们通过编写一条又一条指令去让计算机执行一些动作，这其中一般都会涉及到很多繁杂的细节。
    
    声明式就要优雅很多了，我们通过写表达式的方式来声明我们想干什么，而不是通过一步一步的指示。
    
    函数式编程的一个明显的好处就是这种声明式的代码，对于无副作用的纯函数，可以不考虑函数内部是如何实现的，专注于编写业务代码。优化代码时，目光只需要集中在这些稳定坚固的函数内部即可。
    
8. 惰性求值、惰性函数、惰性链
    
    在指令式语言中以下代码会按顺序执行，由于每个函数都有可能改动或者依赖于其外部的状态，因此必须顺序执行。
    
    惰性链可以将代码的求值延迟到需要结果值时再进行,就是最后一步获取结果。
    
        惰性函数
        ``` javascript
            function ajax(){
                if(XMLHttpRequest){
                    ajax = function(){
                        return new XMLHttpRequest();
                    }
                }else{
                    ajax = function(){
                        return new ActiveXObject('Microsoft,XMLHTTP);
                    }
                }
            }
    ```
    
9. 函子
    
    函子是函数式编程里最重要的数据类型，也是基本的运算单位和功能单位。
    
        一个容器，通过变形关系将成员变形成为了另一个容器的成员，这个容器就是函子。
        
         1. 函子的代码实现
                
                ``` javascript
                class Functor{                  //函子
                  constructor(val){
                    this.val = val;
                  }
                  map(f){
                    return new Functor(f(this.val));
                  }
                ```
                
        
                函子的标志就是容器具有map方法，该方法就是将容器里的每个值，映射到另一个容器。map接受的是一个函数。
        
        2. of方法
        
            生成新的函子的时候，用了new ，这个不像函数式编程。所以就有了of。
        
            ``` javascript
                Functor.of= function(val){
                    return new Functor(val);
                }
            ```
        
        3. Maybe函子
        
             ``` javascript           
                class Maybe extends Functor{
                    map(f){
                        return this.val ? Maybe.of(f(this.val)):Maybe.of(null);
                    }
                }
             ```
        
        4. Either函子
        
            ``` javascript 
                class Either extends Functor{
                    constructor(left,right){
                        this.left = left;
                        this.right = right;
                    }
                    map(f){
                        return this.right
                            ? Either.of(this.left,f(this.right))
                            : Either.of(f(this.left),this.right)
                    }
                }
                Either.of = (left,right) => new Either(left,right);
            
            ```
        
        5. ap 函子
        
            ``` javascript
                class Ap extends Functor {
                    ap(F) {
                        return Ap.of(this.val(F.val));
                    }
                }
            
                function add(x) {
                    return function (y) {
                        return x + y;
                    };
                }
                Ap.of(add(2)).ap(Maybe.of(3));
            ```
        
        6. Monad函子
            Monad 函子的作用是，总是返回一个单层的函子。
        
            ``` javascript
                class Monad extends Functor {
                    join() {
                        return this.val;
                    }
                    flatMap(f) {
                        return this.map(f).join();
                    }
                }
            ```
        
        7. IO 操作  
            1. I/O 是不纯的操作，普通的函数式编程没法做，这时就需要把 IO 操作写成Monad函子，通过它来完成。
        
            2. IO 跟前面那几个 Functor 不同的地方在于，它的 __value 是一个函数。 它把不纯的操作(比如 IO、网络请求、DOM)包裹到一个函数内，从而 延迟这个操作的执行。所以我们认为，IO 包含的是被包裹的操作的返回 值。
        
            3. IO其实也算是惰性求值。
        
            4. IO负责了调用链积累了很多很多不纯的操作，带来的复杂性和不可维护性
    
    ### PWA
    
    1. PWA好处
        1.响应式：用户界面可以兼容多设备。
        2.应用化：交互体验接近native应用。
        3.网络依赖低。
        4.延续性：借助推送功能
    
    2. PWA核心技术(service Work)
            通过拦截网络请求，使得网站运行更快，或者在离线情况下，依然可以执行。
    
        1. 判断是否支持serviceWorker
            ``` javascript
                // 先注册serviceWorker
                if("ServiceWorker" in window){
                    navigator.serviceWorker.register("/sw.js")
                    .then(function(registation){
                        console.log(registation.scope);
                    }).catch(function(err){
                        console.log(err)
                    })
                }
            ```
        2. 编写更新文件的js文件
            ``` javascript
                // sw.js
    
                // skipWaiting 表示当前处在 waiting 状态的脚本进入active状态
                const cacheName = "xxx"; //初始化版本号用于缓存更新
                const filesToCache = []; // 需要缓存的文件
    
                // 加入缓存列表 强制缓存更新
                function updateStaticCache(){
                    return caches.open(cacheName)
                    .then(function(cache){
                        return cache.addAll(fileToCache);
                    })
                    .then(()=>self.skipWaiting());
                }
    
                //首次安装完成时,装载缓存,只执行一次
                self.addEventListener("install",(event)=>{
                    event.waitUntil(updateStaticCache());
                }) 
    
                // 激活成功，更新静态文件
                self.addEventListener("activate",()=>{
                    event.waitUntil(caches.keys().then(function(keyList){
                        return Promise.all(keyList.map(function(key){
                            //更换key
                            if(key !== cacheName){
                                return caches.delete(key);
                            }
                        }));
                    });
                });
    
                //l拦截所有的请求
                self.addEventListener("fetch",(event)=>{
                    // 找到真正的缓存
                    // 获得所有的请求event.request
                    event.respondWith(caches.match(event.request).then(function(res){
                        return res || fetch(event.request)
                    }));
                }) ;
    
            ```

### 架构

1. MVC
2. MVP
3. MVVM
    1. 单页(SPA)
    2. 多页(MPA)
    3. 依赖注入(DI,IoC,AOP)
        1. inversify
            1. 使用ts，要使用ioc就要先使用 interface。只需要接口的名字，不管怎么实现的。

            2. 下载inversify库。  

                    npm install inversify inversify-koa reflect-metadata --save;

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

            4. 创建 services 类

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

            5. 定义 TYPES 常量对象

                ``` javascript

                var TYPES = {
                    Ninja: "Ninja",
                    Katana: "Katana",
                    Shuriken: "Shuriken"
                };

                ```

            6. 将需要的注入的类标记并和TYPES的常量对象关联

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

            7. 创建ioc容器，并将定义好的类绑定到容器

                ``` javascript
                    import { Container } from "inversify";
                    const  container = new Container();
                    container.bind(TYPES.Ninja).to(Ninja);
                    container.bind(TYPES.Katana).to(Katana);
                    container.bind(TYPES.Shuriken).to(Shuriken);
                ```

            8. 直接使用实例

                ``` javascript
                    let ninja = container.get(TYPES.Ninja);
                    return ninja;
                ```

            9. 使用provide

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

            10. 或者使用 injectable

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

            11. 当controller需要依赖注入时

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

            12. 最后使用时

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

        2. awilix
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

### 三大框架

1. Angular
2. React
    DOM Differ Virtual Dom
    集合了最小操作dom的过程。

    他生成的dom要比自己写的dom的属性少。

        ``` javascript
            // 生成虚拟dom
            class Element{
                constructor(type,props,children){
                    this.type=type;
                    this.props = props;
                    this.children = children;
                }
            }
            function createElement(type,props,children){
                return new Element(type,props,children);
            }
            createElement('ul',{'class':'item-list},[
                createElement('li',{'class':'item'},["1"]);
            ]);
        ```

    通过对两个树的深度优先遍历并平级对比

        ``` javascript
            // dom diff
            //1.属性遍历{type:"ATTRS"}
            //2.文本变量
            //3.节点被删除
            //4.节点变化
            let globalIndex = 0;
            //补丁包
            let patchs={};
            function diff(oldTree,newTree){
                dfswalk(oldTree,newTree,globalIndexx);
                return patchs;
            }
            // 先序遍历
            function dfswalk(oldTree,newTree,index){
                let currentPatchs = [];
                if(!newTree){
                    currentPatchs.push({
                        type:"REMOVE",
                        index
                    });
                }else if(_.isString(oldTree)){
                    if(_isString(newTree) && oldTree !== newTree  ){
                        currentPatchs.push({
                            type:'TEXT',
                            text:newTree
                        })
                    }
                }else if(oldTree.type === newTress.type){
                    //1.比属性
                    //2.比节点
                    diffChildren(oldTree.children,newTree.children);
                }
                if(currentPatchs.length>0){
                    patchs[index] = currentPatchs
                }
            }
    
            function diffChildren(oldChildren,newChildren){
                oldChildren.forEach((child,idx)=>{
                    dfswalk(child,newChildren[idx],++globalIndex);
                })
            }
    
            function util(){}
            util.isSting = (node) =>{
                return typeof node === 'string';
            }
        ```
3. Vue
    1. Vue原理
    
    2. SSR渲染

5. TypeScript

6. ES6
    1. Promise
    2. Proxy
    3. Reflect
    4. async/await
    5. */yield

## 测试

1. QA测试
    - 正确性：测试可以验证代码的正确性。
    - 自动化：做到一次编写，多次运行。
    - 解释性：测试用例用于接口，模块，那么在阅读测试用例时比文档更清晰。
    - 驱动开发，指导设计：TDD,先做出API的设计
    - 保证重构：为了保证重构后的代码质量，用测试用例。

2. 单元测试
    1. 概述

        使用框架：karma

        目的：能够让开发者明确代码结果。

        原则：单一职责、接口抽象、层次分离。

        断言库：保证最小单元是否正常运行检测方法。

        测试风格：

        1. 测试驱动开发 TDD(Test-Driven Development)

            关注所有功能是否被实现。

        2. 行为驱动开发 BDD(Behavior Driven Development)

            关注整体行为是否符合整体预测。

        常用的测试框架:

        1. Jasmine.js(BDD)
        2. chai.js(TDD,BDD)

    2. 单元测试运行流程 

        每一个测试用例组通过describe进行设置

        before  - beforeEach - it - after - afterEach

    3. 自动化单元测试

        karma 自动化runner集成PhantomJS无刷新

    4. 报告和单测覆盖率检查
        - npm install karma-coverage —save-dev
        - coverageReporter: { type: 'html',dir: 'coverage/' } //配制代码覆盖测试率生成结果

3. 性能测试

    使用框架 Benchmark.js

    Benchmark基准测试方法，它并不是简单地统计 执行多少次测试代码后对比时间，它对测试有着 严密的抽样过程。执行多少次取决于采样到的数 据能否完成统计。根据统计次数计算方差。

4. E2E测试 页面功能

    使用框架 selenium 或者 nightwatch

5. 接口测试 测试API

    使用框架 mocha

    1 全局执行命令行
    2 把你需要的那个包文件写到 js 文件里 node执行它
    3 mocha done要记住

6. 页面UI自动化测试

    使用框架：backstopjs

    sudo yarn global add backstopjs
    backstop init
    backstop test 注意图片的格式

7. Jasmin 语法

    1. describe测试包（官方称之为suite）

        describe 是 Jasmine 的全局函数，作为一个 Test Suite 的开始，它通常有 2 个参数：字符串和方法。字符串作为特定 Suite 的名字和标题。方法是包含实现 Suite 的代码。

    2. it测试用例（官方称之为spec） 

        it 有 2 个参数，字符串和方法。
        每个 Spec 包含一个或多个 expectations 来测试需要测试代码。
        Jasmine 中的每个 expectation 是一个断言，可以是 true 或者 false。
        当每个 Spec 中的所有 expectations 都是 true，则通过测试。有任何一个 expectation 是 false，则未通过测试。而方法的内容就是测试主体。

## 工程化

1. webpack
    1. 模块化
        >模块化是一种将系统分离成独立功能部分的方法，严格定义模块接口、模块间具有透明性。

        1. 模块方式
            - Commomjs
            - AMD
            - CMD

        2. 模块化的价值(高内聚，低耦合)

            建立模块化的标准，能够管理模块之间的依赖，从而提升代码的可维护性和复用性

    2. loader

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

    3. plugin

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
2. gulp
3. FIS
4. babel
5. Rollup

## 后台

1. Node
    1. 事件机制
    2. koa
    3. express

2. PHP
    通过require-promise 封装PHP的形成接口。
3. Python
4. MYSQL

## 调试及性能优化

1. CDN
2. Nginx
3. 雅虎军规
4. AMP
5. 断点以及捕捉事件绑定
6. Audits 和 Chrome 性能插件
7. Timeline掌控帧渲染模式
8. Profiles分析具体问题
9. PM2
10. 网页的渲染过程
    1.获取网页的dom，分割多层
    2. 对每个图层的节点结算样式结果。
    
    3. 为每个节点绘制图形和位置(回流)重排 layout
    
    4. 将每个节点绘制到图层的位图中(重绘)。
    
    5. 图形纹理上传到GPU。
    
    6. 符合多个图层最终生成的最终图像。
    
        1. 独立成层
            根元素、position、transform、半透明、滤镜、canvas、video、overflow。
        2. 参与GPU
            CSS3D/VIDEO/WEBGL/TRANSFORM/滤镜
    
    7. 重排
    1. 添加或者删除元素。
        2. 盒子模型变化。
        3. 内容变化。
        4. 网页初始化渲染
        5. 读取一些元素的时候，会放弃一些优化。
        6. 读取一些属性，如offset、scroll、client、width。
    
        Css 重排(回流)和重绘
    
        > 重排一定会引起重绘，但重绘不一定引起重排
    
    8. cpu 和 gpu
        相同之处： 两者总线跟外界联系，有自己缓存体系，以及数字和逻辑运算单元。一句话，完成结算任务而生。
        不同之处：CPU主要负责操作系统和应用程序，GPU主要是负责显示相关的数据处理。一句话 GPU的活CPU一般也可以干，只是效率低。
    
## 移动端和桌面

1. Flutter
2. React Native
3. Android Studio

## 数据结构算法

1. 数据结构
    1.列表
    2.栈
    3.队列
    4.链表简介
    单向链表与双向链表
    5.字典
    6.散列
    7.集合

2. 算法
    1.二叉树
    2.图
    3.冒泡排序
    4.选择排序
    5.插入排序
    6.希尔排序
    7.归并排序
    8.快速排序
    9.检索算法

## 网络协议

1. http
    1.TCP/IP 协议
        1.ISO/OSI协议，
            应用层、表示层、会话层、传输层、网络层、数据链路层、物理层
        2.TCP/IP 协议
            应用层：Http,DNS,FTP,SMTP等。
            传输层：TCP（传输控制协议）和UDP（用户数据报协议）
            网络层：主要解决主机到主机通信问题。IP协议是网际互联层最重要的协议。
            网络接口层：负责监视数据在主机和网络之间的交换。
    2. 缓存
2. http2
2. DNS