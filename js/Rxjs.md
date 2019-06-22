# Rx

- Observable

>代表了未来可能会产生的一系列的值或事件的集合。

> Observable需要被订阅才能触发处理--subscribe。

- Observer
> 回调函数的集合，它知道如何去处理observable上产生的值或者事件，当然也包括异常。

- Operator
> 纯函数，以函数式的风格通过各种各样的操作符相互配合对observable上产生的数据集合进处理。

- Subscription
> 代表当前正在订阅的observable，主要作用是用来取消订阅行为。

- Subject
> 相当于一个事件发射器，允许将相同的值传递给多个订阅者。

- Schedulers
> 调度者集中了派发器(dispatcher)控制并发，允许我们在使用类似setTimeout(),requestAnimationFrame或其他方法时，协调计算。

## Observable

### 创建 Observables

- Observable.of(...args);
- Observable.fromPromise(promise);
- Observable.fromEvent(element,eventName);
- Observable.ajax(url|AjaxRequest);
- Observable.create(subscribe);

        var ob = Rx.Observable.create(function(observer){
            console.log('start');
            observer.next(1);
            observer.next(2);
            setTimeout(()=>{
                observer.next(3)
            },100);
            console.log('end');
        });

        ob.subscribe(function(x){
            console.log(x);
        });

        //start
        //1
        //2
        //end
        //3

### 订阅 Observable

    var observable = Rx.Observable.create(function subscribe(observer) {
        var id = setInterval(() => {
            observer.next('hi');
        },1000);
    });
    observable.subscribe(x => console.log(x));

observable.subscribe 和 Observable.create(function subscribe(observer) {...}) 中的 subscribe 有着同样的名字，这并不是一个巧合。在库中，它们是不同的，但从实际出发，你可以认为在概念上它们是等同的。

这表明 subscribe 调用在同一 Observable 的多个观察者之间是不共享的。当使用一个观察者调用 observable.subscribe 时，Observable.create(function subscribe(observer) {...}) 中的 subscribe 函数只服务于给定的观察者。对 observable.subscribe 的每次调用都会触发针对给定观察者的独立设置。

> 订阅 Observable 像是调用函数, 并提供接收数据的回调函数。

### 执行 Observable

Observable 执行后可以产生三种类型的值：也是subscribe函数的参数

- Next：发送一个正常的值，比如String， Number 或者 Object 等。
- Error：发送一个javascript的错误或者抛出异常。
- Complete：停止发送值。

        next: x => console.log(x),
        error: err => console.error(err),
        complete: () => console.log('done'),

Next类型的通知是最重要也是最常用的一种，它代表了将要传递给观察者的数据。Error 和 Complete 类型的通知在整个Observable的执行过程中只可以发生一次，并且它们是互斥的，只有一个可以发生。

如果Observable在执行过程中发生异常，我们可以在subscribe函数内部使用 try/catch 块来捕获它：

    var observable = Rx.Observable.create(function subscribe(observer) {
        try {
            observer.next(1);
            observer.next(2);
            observer.next(3);
            observer.complete();
        } catch(error) {
            observer.error(error); // 传递错误
        }
    });

### 清理 Observable 执行

当调用了 observable.subscribe ，观察者会被附加到新创建的 Observable 执行中。这个调用还返回一个对象，即 Subscription (订阅)：

    var subscription = observable.subscribe(x => console.log(x));

使用 subscription.unsubscribe() 你可以取消进行中的执行：

    var observable = Rx.Observable.from([10, 20, 30]);
    var subscription = observable.subscribe(x => console.log(x));
    // 稍后：
    subscription.unsubscribe();

当你订阅了 Observable，你会得到一个 Subscription ，它表示进行中的执行。只要调用 unsubscribe() 方法就可以取消执行。

当使用Observable.create()来创建的时候必须定义如何清理执行的资源。

    var ob = Rx.Observable.create(function subscribe(observer){
        var intervalID = setInterval(()=>{
            observer.next('hi');
        },1000);

        return unsubscribe(){
            clearInterval(intervalID);
        }
    });

    var unsubscribe = ob.subscribe(x=>console.log(x));
    unsubscribe.unsubscribe();

## Observer (观察者)

Observer只是三种回调函数的集合，里面的值是对应Observable执行后产生的三种类型。

    var observer = {
        next: x => console.log('Observer got a next value: ' + x),
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
    };

要使用观察者，需要把它提供给 Observable 的 subscribe 方法：

    observable.subscribe(observer);

## Subscription (订阅)

 Subscription 是表示可清理资源的对象，通常是 Observable 的执行。
 Subscription 基本上只有一个 unsubscribe() 函数，这个函数用来释放资源或去取消 Observable 执行。

    var subscription = Observable.subscribe();
    subscription.unsubscribe();

Subscription是可以合并的，用add(Subscription),来合并。用remove(Subscription),来取消合并。

## Subject (主体)

Subject 是允许值多播给观察者，但是 Observable 是单播。

每个 Subject 都是 Observable，但是观察者不知道观察的是Observable还是Subject。
每个 Subject 都是 观察者。 所以会有Next(),Error(),Complete()方法。要给 Subject 提供新值，只要调用 next(theValue)，它会将值多播给已注册监听该 Subject 的观察者们。

    var subject = new Rx.Subject();

    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });
    subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });

    subject.next(1);
    subject.next(2);
    //observerA:1
    //observerB:1
    //observerA:2
    //observerB:2

### 多播Observable

> 多播 Observable 在底层是通过使用 Subject 使得多个观察者可以看见同一个 Observable 执行。

1. 先定义普通的 Observable
2. 再 new Subject();
3. 用 Observable 的 multicast 通过 Subject 创建 ConnectableObservable
4. 在观察 ConnectableObservable
5. 最后用 connect 方法启动共享的Observable执行。

        var source = Rx.Observable.from([1,2,3,4]);
        var subject = new Subject();
        var multicasted = source.multicast(subject);

        multicasted.subscribe({
            next: x => consolre.log('A'+x);
        });
        multicasted.subscribe({
            next: x => console.log('B'+x);
        });

        // 返回的是Subscription,因此可以取消共享的Observable
        multicasted.connect(); -> source.subscribe(subject);

### 引用计数

不想手动调用connect(),和取消subscribe。
当第一个观察者订阅了自动执行共享，当最后一个观察者取消订阅时自动取消共享执行。

        var source = Rx.Observable.interval(500);
        var subject = new Rx.Subject();
        var multicasted = source.multicast(subject);
        var subscription1,subscription2,subscriptionConnect;

        subscription1 = multicasted.subscribe({next:x=>console.log('a'+x)});
        subscriptionConnect = multicasted.connect();
        setTimeout(()=>{
             subscription2 = multicasted.subscribe({next:x=>console.log('b'+x)});
        },600)

          setTimeout(()=>{
             subscription1.unsubscribe();
        },1200);

        setTimeout(()=>{
            subscription2.unsubscribe();
            subscriptionConnect.unsubscribe();
        },2000);

不想调用 connect 可以调用 ConnectableObservable 的 refCount() 方法(引用计数).返回的是Observable。当订阅者0-》1调用 connect ，当订阅者1-》0则停止

        var source = Rx.Observable.interval(500);
        var subject = new Rx.Subject();
        var refCounted = source.multicast(subject).refCount();
        var subscription1, subscription2, subscriptionConnect;

        subscription1 = refCounted.subscribe({
            next: (v) => console.log('observerA: ' + v)
        });

        setTimeout(() => {
            subscription2 = refCounted.subscribe({
                next: (v) => console.log('observerB: ' + v)
            });
        }, 600);

        setTimeout(() => {
            subscription1.unsubscribe();
        }, 1200);

        setTimeout(() => {
            subscription2.unsubscribe();
        }, 2000);

### BehaviorSubject

> 它有一个“当前值”的概念。它保存了发送给消费者的最新值。
并且当有新的观察者订阅时，会立即从 BehaviorSubject 那接收到“当前值”。

    ar subject = new Rx.BehaviorSubject(0); // 0是初始值

    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });

    subject.next(1);
    subject.next(2);

    subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });

    subject.next(3);

    //observerA: 0
    //observerA: 1
    //observerA: 2
    //observerB: 2
    //observerA: 3
    //observerB: 3

### ReplaySubject

> ReplaySubject 记录 Observable 执行中的多个值并将其回放给新的订阅者。
    var subject = new Rx.ReplaySubject(3); // 为新的订阅者缓冲3个值

    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);

    subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });

    subject.next(5);

    //observerA: 1
    //observerA: 2
    //observerA: 3
    //observerA: 4
    //observerB: 2
    //observerB: 3
    //observerB: 4
    //observerA: 5
    //observerB: 5    

除了缓冲数量，你还可以指定 window time (以毫秒为单位)来确定多久之前的值可以记录。在下面的示例中，我们使用了较大的缓存数量100，但 window time 参数只设置了500毫秒。
    
    var subject = new Rx.ReplaySubject(100, 500 /* windowTime */);

    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });

    var i = 1;
    setInterval(() => subject.next(i++), 200);

    setTimeout(() => {
    subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });
    }, 1000);

    //observerA: 1
    //observerA: 2
    //observerA: 3
    //observerA: 4
    //observerA: 5
    //observerB: 3
    //observerB: 4
    //observerB: 5
    //observerA: 6
    //observerB: 6
...
### AsyncSubject

> 当Observable执行完成时将最后的值发送给观察者。

    var subject = new Rx.AsyncSubject();

    subject.subscribe({
    next: (v) => console.log('observerA: ' + v)
    });

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);

    subject.subscribe({
    next: (v) => console.log('observerB: ' + v)
    });

    subject.next(5);
    subject.complete();
    // A,5
    // b,5

## Operators (操作符)

> 操作符就是一个纯函数，参数是当前的 Observable ，返回一个新的 Observable。

    function multiplyByTen(input) {
    var output = Rx.Observable.create(function subscribe(observer) {
        input.subscribe({
        next: (v) => observer.next(10 * v),
        error: (err) => observer.error(err),
        complete: () => observer.complete()
        });
    });
    return output;
    }

    var input = Rx.Observable.from([1, 2, 3, 4]);
    var output = multiplyByTen(input);
    output.subscribe(x => console.log(x));
    //10
    //20
    //30
    //40

### 实例操作符 vs. 静态操作符

实例操作符是Observable实例上的方法。

实例运算符是使用 this 关键字来指代输入的 Observable 的函数。

    Rx.Observable.prototype.multiplyByTen = function multiplyByTen() {
        var input = this;
        return Rx.Observable.create(function subscribe(observer) {
            input.subscribe({
            next: (v) => observer.next(10 * v),
            error: (err) => observer.error(err),
            complete: () => observer.complete()
            });
        });
    }

静态操作符一般是加在Observable类上的方法，内部一般不依靠this，而是依靠参数。
通常用来从头开始创建 Observalbe 。

最常用的静态操作符类型是所谓的创建操作符。它们只接收非 Observable 参数，比如数字，然后创建一个新的 Observable ，而不是将一个输入 Observable 转换为输出 Observable 。
比如：
    
    var observable = Rx.Observable.interval(1000 /* 毫秒数 */);

## Scheduler(调度器)

调度器控制着何时启动 subscription 和何时发送通知。

- 调度器是一种数据结构。 它知道如何根据优先级或其他标准来存储任务和将任务进行排序。
- 调度器是执行上下文。 它表示在何时何地执行任务(举例来说，立即的，或另一种回调函数机制(比如 setTimeout 或 process.nextTick)，或动画帧)。
- 调度器有一个(虚拟的)时钟。 调度器功能通过它的 getter 方法 now() 提供了“时间”的概念。在具体调度器上安排的任务将严格遵循该时钟所表示的时间。

### 调度器类型

|               调度器	            |                目的                    |
|----------------------------|------------------------------ |
|null	                               |       不传递任何调度器的话，会以同步递归的方式发送通知。用于定时操作或尾递归操作。|
|Rx.Scheduler.queue	        |      当前事件帧中的队列调度(蹦床调度器)。用于迭代操作。                                             |
|Rx.Scheduler.asap	         |      微任务的队列调度，它使用可用的最快速的传输机制，比如 Node.js 的 process.nextTick() 或 Web Worker 的 MessageChannel 或 setTimeout 或其他。用于异步转换。|
|Rx.Scheduler.async	|使用 setInterval 的调度。用于基于时间的操作符。                                                                |

静态创建操作符通常可以接收调度器作为参数。 举例来说，from(array, scheduler) ;

- 使用 subscribeOn 来调度 subscribe() 调用在什么样的上下文中执行。
- 使用 observeOn 来调度发送通知的的上下文。
