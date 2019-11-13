# 堆和栈

## 堆

堆通常是可以被看做一个树的数组对象，存的是对象，从低位向高位增长，效率比栈低。

内存 js申请但是浏览器的引擎帮你申请的。

## 栈

栈,特性就是先进后出.
栈里存的是函数里的基础变量，从高位向低位压栈。
只有8兆。

## js执行流程

### 全局 GO ->globalContext

全局执行上下文 globalContext === window

### 变量对象VO -> Variable Object

是执行上下文的特殊对象，用来存储上下文的函数声明，函数形参和变量。

{
    		1.函数声明,
    		2.变量声明,
    		3.函数的形参
		}

### 活动对象AO -> Active Object

是函数上下文中的变量对象.是函数动态创建出来的。

{
    		1.内部的arguments
    		2.内部定义的函数
    		3.绑定上下文的环境变量
    		4.内部定义的变量
		}

### 执行栈

``` js
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

```js
ECS=[
    fun2,
    fun1,
    globalContext:{
        VO:global,
        scope:[globalContext.VO],
        this:globalContext.VO
    }
]
```

4.AO对象分两个阶段

​	4.1. 创建阶段：变量提升,值都是undefined。

```js
fun1ExecutionContext = {
    AO:{
        fun2:undefined
    },
    this:undefined,
}
```

​	4.2. 执行阶段：按照函数的执行上下文进行执行。

```js
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
```

5.VO就是函数上下文的链接，AO是函数自带的。

### 总结

js 同步执行栈，异步执行队列。队列有优先级。__队列->先进先出__。

__函数调用->创建AO->执行->压栈->弹栈，__
		__函数不执行不压栈。__

### 算法

深度优先 -> dom differ

广度优先-> V8 垃圾回收 

## V8垃圾回收

主要是基于分代式垃圾回收机制。
V8内存分为新生代和老生代两代。

新生代为存活时间较短对象，老生代中为存活时间较长的对象。

### 新生代

新生代主要通过 scavenge算法，在具体实现通过采用cheney.cheney是一种采用复制的方法实现的垃圾回收算法。

它将内存一份为二，每个空间叫semispace。一个处于使用，一个处于闲置。使用的叫from，闲置的为to。

先全部进from，存活的赋值到to，非存活的被释放，然后互换位置，再次进行回收，发现被回收过的直接到老生代，或者to的空间使用超过25%。
缺点是只能使用堆内存的一半，是一个空间换时间的办法。

### 老生代

主要用Mark-sweep和 Mark-compact.

Mark-sweep是编辑清除，标记需要释放的对象，然后清除。但是清除完后内存不连续，然后用Mark-compact,将活着的对象移动到一半，移动完后，直接清理边界外的内存。V8后续还引入了延迟出来，增量处理，并计划引入并行标记处理。

## MVC框架

controller 可以控制view和model
		view 可以控制controller和model

