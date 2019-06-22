# CSS

## OO CSS

OO CSS 将页面可重用元素抽象成一个类，用Class加以描述，而与其对应的HTML即可看成是此类的一个实例。

Neat.css 结合了Reset.css和Normalize.css;

[OOCSS](oocss.org)

### 作用

1. 加强代码复用以方便维护。
2. 减少CSS体积。
3. 提升渲染效率。
4. 组件库思想、栅格布局可共用、减少选择器、方便扩展。

### 注意事项

1. 不要直接定义子节点，应把共性声明放到父类。
2. 结构与皮肤相分离。
3. 结构与内容相分离。
4. 抽象出可重用的元素，建好组件库，在组件库内寻找可用的元素组装页面。
5. 往你想扩展的对象本身增加class而不失他的父节点。
6. 对象应保持独立性。
7. 避免使用ID选择器，权重太高，无法重用。
8. 避免位置相关的样式。
9. 保证选择器相同的权重。
10. 类名 简单 清晰 语义化 OOCSS的名字并不影响HTML语义化。

## css预处理器

Less Sass

## css后处理器

- css 压缩 clean-css
- 自动添加浏览器前缀 autoprefixer 。可以用webpack或者gulp进行编译。
- css更加美观的排序 CSScomb
- Rework 取代 stylus 后处理器发热
- 前后同吃 PostCss

## POSTCSS

浏览器原生支持

POST Next 是浏览器兼容的

### css变量

- 定义css变量  --mouse-x: 0.1

- 使用css变量  var(--mouse-x)

- css变量结合calc计算公式  left: calc(1000px * var(--mouse-x));

- 使用css变量，默认值  var(--mouse-x,01);

- 全局变量 :root{ --height: 100px;}

## CSS 分层

### 为什么分层

1.有助于扩展性，性能的提升和代码组织的管理。
2.可以让团队统一命名规范，方便维护。

### SMACSS

可扩展的模块化架构的css，像oocss一样1️以减少重复样式为基础，使用一套五个层次来划分css：

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

### BEM

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

### Suit

Suit 起源 BEM ，但是用驼峰命名和连字符把组件从他们的修饰符和子孙后代中区分出来。

- 修饰符是--，子模块使用__符号。

~~~ css
    .ComponentName{}
    .ComponentName--modifierName{}
~~~

### ACSS

atoms -> molecules -> organisms -> templates -> pages

~~~ css
    .m-10{
        margin:10px;
    }
~~~

### ITCSS

- Settings - 全局可用配置
- Tools - 通用工具函数
- Generic - 通用基础样式
- Base - 未归类的HTML元素
- Objects - 设计部分使用的专类
- Components - 符合自己的组件的
- Trumps - 重写只影响一块DOM

## CSS矩阵

## CSS doodle

[css-doodle](https://css-doodle.com)

使用的是

~~~ html
<css-doodle>
    /*放代码*/
</css-doodle>
~~~

### Grid

rows x columns ，值从1到32，没有值或者值是0的时候，默认是1x1。
如果只有一个值，则默认是 行列相同。

#### @grid

效果和 Grid 一样，只是 5 / 8em; /后面代表 @size 的值。

~~~ html
<css-doodle grid="5x5">

</css-doodle>
~~~

或者

~~~ css
     :doodle {
        @grid: 5x5;
    }
~~~

### Selectors

#### :doodle

指的是元素本身，所有的关于css-doodle的代码都放在里面，普通的代码放在外面。

## 双飞翼布局

1.position;
2.float
3.负边距
4.等高
5.盒子模型
6.清除浮动

``` html
<div>
    <div class="left"></div>
    <div class="middle"></div>
    <div class="right"></div>
</div>
```

## vh vw

vh vw 代表浏览器的宽度和高度除以100 
data-dpr属性动态

## ICON-FONT 

1.no-image时代 纯色不超过2的图像。
2.不要写中文字体名字,保证西文字体在中文字体前面。mac>linux>window;
3. font-family: sans-serif;系统默认，字体多个单词组成加引号。

## css HINT;
