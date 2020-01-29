# js数据类型方法总结

## 字符串方法

``` js
charAt(n) // 返回给定位置的字符

charCodeAt(n) // 返回给定位置的字符编码

"dddd"[n] // 访问字符串特定索引的字符

concat() //用于将一个或多个字符串拼接起来

slice(start, end) / substring(start, end)  // 返回一个新的从开始位置到结束位置的字符串，不包括结束位置 slice 的参数可以为负数

indexOf(str,[startIndex]) // 返回指定字符在字符串中的索引，第二个参数为从指定位置开始搜索，可选

trim() // 该方法会创建一个字符串的副本，删除前置与后缀的所有空格，返回结果

toLowerCase() / toUpperCase() // 小写大写转换

// 字符串的模式匹配方法
match(pattern) //本质上与RegExp的exec()方法相同，只接受一个参数，即正则表达式或RegExp对象

search(pattern) // 参数与match参数相同，返回字符串中第一个匹配项的索引

replace(str | pattern, text | fn)  //第一个参数为想要被替换的字符串或正则表达式，第二个参数为要替换的字符串或一个函数

split() // 第一个参数是需要指定分隔符匹配中的字符串或者正则表达式，也可以传递第二个参数，用来限制返回数组的长度

localeCompare() // 比较两个字符串，如果字符串在字母表中排在字符串参数之前，返回负数，相等返回0，反之正数

// es7
// 字符串补全长度的功能 
// 1. leng指定字符串长度，原字符串的长度等于或大于指定的最小长度，则返回原字符串.
// 2. 如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。
// 3. 如果没有第二个参数则用空格代替
padStart(leng,param) // 用于头部补全，
padEnd(leng,param)   // 用于尾部补全
```

## 数字方法

``` javascript
Number.isNaN() // 判断值是否为 数字值 并且是否等价于 NaN。
isNaN() // 判断值是否为数字
```



## 数组方法

``` js
isArray(value) // 检验是否为数组

toString() // 将数组转化为以逗号隔开的字符串

join() // 将数组按照参数拼接成一个字符串

// 栈的方法
push() // 可以接受任何参数将其放在数组最后，返回值是数组的长度。

pop() // 移除数组的最后一项，返回值是移除项

// 队列方法
shift() // 移除数组的第一项，返回值是移除项

unshift() // 从数组的第一项开始添加值

// 排序
sort(function (a,b){
    return a - b; // 正序 b - a 倒序
})

reverse() // 将数组倒序

// 操作方法
fill(值, 起始位置, 结束位置) // 用一个固定值填充一个数组从起始位置到结束位置的全部位置，不包括结束位置

concat(数组 | 一个或者多个元素)  // 合并多个数组并返回一个新数组

slice(起始位置, 结束位置) // 切分数组，返回新数组，但是不包含结束位置

splice(起始位置, 删除个数, 插入的元素) // 删除|插入|替代数组，返回删除的数组组成的数组，会修改原数组

// 位置方法
indexOf(查找的项, 查找起点的位置)

lastIndexOf() //从后往前查找

// 迭代方法
every(fn(value, index, arr){return bool}) // 数组中每一项都满足则返回true

some(fn(value, index, arr){return bool}) // 数组中有一项满足则返回true

filter(fn(value, index, arr){return bool}) // 对数组进行条件筛选，返回新数组

forEach(fn(value, index, arr){}) // 遍历数组但无返回值

map(fn(value, index, arr){return value}) // 遍历数组，返回每次函数调用返回结果组成的数组

toLocaleString(locales,option) // locales 带有BCP 47语言标记的字符串或字符串数组, options 一个可配置属性的对象，对于数字 Number.prototype.toLocaleString()，对于日期Date.prototype.toLocaleString().

    // toLocaleString 例子
    const array1 = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')];
    const localeString = array1.toLocaleString('en', {timeZone: "UTC"});
    // expected output: "1,a,12/21/1997, 2:12:00 PM",

// 查找方法
find() // 返回数组中满足条件的第一个元素，否则返回 undefined

findIndex() //返回数组中满足条件的第一个元素的索引，否则返回 -1

includes() // 数组中是否有指定的值，包含则返回true,否则返回false

// 归并方法
reduce(fn(prev,cur,index,array){return }，initValue) // 返回是最后一次回调返回的值,initValue是开始的初始值

flat() // 多元数组转一元 [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]] =>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

flatMap() // 首先使用映射函数映射每个元素，然后将结果压缩成一个新数组

// flatMap例子
    var arr1 = [1, 2, 3, 4];

    arr1.map(x => [x * 2]);
    // [[2], [4], [6], [8]]

    arr1.flatMap(x => [x * 2]);
    // [2, 4, 6, 8]

    // only one level is flattened
    arr1.flatMap(x => [[x * 2]]);
    // [[2], [4], [6], [8]]

```

## Object

### Object 构造函数方法

``` js
// 创建对象
assign(target, ...sources) // 将所有可枚举属性的值从一个或者多个源对象复制到目标对象，返回目标对象。

create(proto[, propertiesObject]) // 通过现有对象创建一个新对象，

// 描述符操作
defineProperty(obj, prop, descriptor) // 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

defineProperties(obj,prop) // 在对象中定义新的属性或者修改现有属性的描述符，并返回该对象

interface descriptor{ //是定义其可枚举属性或者属性描述符的对象包含以下
    configurable: boolean; //可修改和删除，默认值false
    enumerable: boolean; // 可枚举，默认值false
    value: any; // 值默认为undefined
    writable: boolean; // 为true, value才能被赋值运算符改变。默认为 false。
    get: ():any | undefined; // 给属性提供 getter 的方法
    set: ():void | undefined; // 给属性提供 setter 的方法
}

freeze() //冻结一个对象，该对象里得值不能被修改且不能修改其对象的原型，只能冻结一层，如果该对象里还有引用类型的值则不会被冻结。

seal() // 可以防止新属性 被添加，或者存在属性 被移除. 

getOwnPropertyDescriptor(obj, prop) // 获取该对象上某个属性的描述符

getOwnPropertyDescriptors(obj) // 获取该对象上所有属性的描述符

// 对象变数组操作
entries() // 返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）。

fromEntries() // 和 entries 功能相反

getOwnPropertyNames(obj) // 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

getOwnPropertySymbols(obj) // 返回一个给定对象自身的所有 Symbol 属性的数组。

hasOwnProperty(prop) // 判断当前对象是否有改属性

isPrototypeOf() // 用于测试一个对象是否存在于另一个对象的原型链上。 prototypeObj.isPrototypeOf(object)
```

注意：

1. 用 `defineProperty` 添加的新属性默认是不可枚举的。所以用 `Object.keys` 是没有新增加的属性。


## RegExp 对象

RegExp(pattern [, flags])

### 参数

__pattern__
正则表达式的文本

__flags__
如果指定，标志可以具有以下值的任意组合：

1. __g__
全局匹配;找到所有匹配，而不是在第一个匹配后停止
2. __i__
忽略大小写
3. __m__
多行; 将开始和结束字符（^和$）视为在多行上工作（也就是，分别匹配每一行的开始和结束（由 \n 或 \r 分割），而不只是只匹配整个输入字符串的最开始和最末尾处。
4. __u__
Unicode; 将模式视为Unicode序列点的序列
5. __y__
粘性匹配; 仅匹配目标字符串中此正则表达式的lastIndex属性指示的索引(并且不尝试从任何后续的索引匹配)。
6. __s__
dotAll模式，匹配任何字符（包括终止符 '\n'）。

### 方法

``` javascript
exec(string:string)  // 在一个指定字符串中执行搜素匹配，返回结果数组或者null
test(string:string) //执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 true 或 false。
````

## JSON

### JSON.stringify

`JSON.stringify`的第二个参数是 *替代者(replacer)*. 替代者(replacer)可以是个函数或数组，用以控制哪些值如何被转换为字符串。

1. 如果替代者(replacer)是个 *数组* ，那么就只有包含在数组中的属性将会被转化为字符串。

2. 如果替代者(replacer)是个 *函数*，这个函数将被对象的每个属性都调用一遍。 函数返回的值会成为这个属性的值，最终体现在转化后的JSON字符串中（译者注：Chrome下，经过实验，如果所有属性均返回同一个值的时候有异常，会直接将返回值作为结果输出而不会输出JSON字符串），而如果返回值为`undefined`，则该属性会被排除在外。

``` javascript
const settings = {
  username: "lydiahallie",
  level: 19,
  health: 90
};

const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);
// "{"level":19, "health":90}"
```

## 其他

1. [new Intl.NumberFormat([locales[, options])](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)

2. 

   