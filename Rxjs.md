# Rx

- Observable
   >代表了未来可能会产生的一系列的值或事件的集合。

   >Observable需要被订阅才能触发处理--subscribe。

- Observer
    > 回调函数的集合，它知道如何去处理observable上产生的值或者事件，当然也包括异常。

- Operator
    > 纯函数，以函数式的风格通过各种各样的操作符相互配合对observable上产生的数据集合进处理。

- Subscription
    >代表当前正在订阅的observable，主要作用是用来取消订阅行为。

- Subject
    >相当于一个事件发射器，允许将相同的值传递给多个订阅者。

- Schedulers
    >调度者集中了派发器(dispatcher)控制并发，允许我们在使用类似setTimeout(),requestAnimationFrame或其他方法时，协调计算。

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

合并序列

    const ob1 = Observable.ajax('api/detail/1');
    const ob2 = Observable.ajax('api/detail/2');
    ...
    const obs = [ob1, ob2...];

    1. 请求顺序串行发出，前一个发完再发下一个。
    Observable.concat(...obs).subscribe(detail=>console.log('每个请求都触发回调'));
    2. 请求同时发送，每一个到达就触发一次
    Observable.merge(...obs).subscribe()
    3. 同时发出并全部到达后合并数组，触发
    Observable.forkJoin(...obs).subscribe(detailArray=>console.log())

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