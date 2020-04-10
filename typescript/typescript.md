# TypeScript

## 原始数据

### Boolean

~~~ js
    let booleanDemo: boolean = true;
~~~

### Number

~~~ js
     let numberDemo: number = 10;
~~~

### String

~~~ js
     let numberDemo: string = "red";
~~~

### Array

~~~ js
    let list: number[] = [1,2,3];
    let list: Array<string> = ['1','2','3'];
~~~

### Tuple

~~~ js
    let x: [string, number];
    x= ["hello", 10];
    x[3] = "world"; //ok.  因为元组里的类型是string|number
    x[4] = true; //error 
~~~

### Enum

~~~ js
    enum Color {Red, Green, Blue}
    let c: Color = Color.Green;  // 显示下标为 1。
    /*-----------------------------*/
    enum Friut {Apple = 1, Pear, Orange} // 默认下标是0，但是现在设置为1，那么其他的按顺序
    enum Friut {Apple = 1, Pear = 2, Orange = 4}  //设置下标
~~~

### Any

可以为任意类型，其中设置数组为any，则数组里的元素可以为任意类型

~~~ js
    let list: any[] = [1, true, "free"];
~~~

### Void

它和 any 的数据类似，但是主要用在函数的返回值，如果没有返回值，则设置成void。

~~~ js
    function warnUser(): void {
        console.log("This is my warning message");
    }
~~~

## 函数

``` typescript
function foo(a: number): number {
  return a * 2;
}

const foo = (a: number): number => {
  return a * 2;
};

const foo2: (a: number) => number = (a) => {
  return a * 3;
};
```

### 可选参数和默认值

``` typescript
function foo(bar: number, bar?: string): void {
  console.log(111);
}

function foo(bar: number, bas: string = 'hello') {
  console.log(bar, bas);
}

```

### 重载

``` typescript
// 重载
function padding(all: number);
function padding(topAndBottom: number, leftAndRight: number);
function padding(top: number, right: number, bottom: number, left: number);

function padding(a: number, b?: number, c?: number, d?: number) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a;
  } else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d,
  };
}

```

## 断言

``` typescript
function handler(event: Event) {
  const mouseEvent = event as MouseEvent;
}

function handler(event: Event) {
  const element = event as HTMLElement; // Error: 'Event' 和 'HTMLElement' 中的任何一个都不能赋值给另外一个
}

```

### 双重断言

> 因为断言可能因为接口的变化造成错误或者增加某些临时属性也会推断错误。

``` typescript
function handler(event: Event) {
  const element = (event as any) as HTMLElement; // ok
}
```

## 索引

``` typescript
interface ArrStr{
    [key: string]: string | number; // 必须包括所有成员类型。
    [index: number]: string; // 字符串索引类型的子级
}
```

### 索引签名嵌套

``` typescript
// Error
interface NestedCSS {
  color?: string; 
  [selector: string]: string | NestedCSS;
}

// ok 
interface NestedCSS {
  color?: string;
  nest?: {
    [selector: string]: NestedCSS;
  };
}
```

## 泛型

``` typescript
const foo = <T>(x: T) => T; // Error: T 标签没有关闭

// good
const foo = <T extends {}>(x: T) => x;
```

## React Tip

``` typescript
exampleRef: Example | null = null; // Example当前的类
input: HTMLInputElement | null = null;
```

## 对象

``` typescript
let foo = {};
foo.bar = 123; // Error: Property 'bar' does not exist on type '{}'
foo.bas = 'Hello World'; // Error: Property 'bas' does not exist on type '{}'

// ok 
let foo = {} as any;
foo.bar = 123;
foo.bas = 'Hello World';

// good
let foo = {
  bar: 123,
  bas: 'Hello World'
};

// better

interface Foo {
  bar: number;
  bas: string;
}

let foo = {} as Foo;
foo.bar = 123;
foo.bas = 'Hello World';
```

