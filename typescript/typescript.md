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