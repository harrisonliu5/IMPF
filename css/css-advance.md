# css3

## 双飞翼布局

 1. 中间区域先写，两边区域后写。

 2. 等高  
> 是先padding-bottom: 9999px;
> margin-bottom: -9999px;
> 在父级 overflow: hidden; 

3. flex布局

    __父级__
    3.1. display: flex; ||  display: inline-flex;

    3.2. flex-direction属性决定主轴的方向（即项目的排列方向）
    > flex-direction: row | row-reverse | column | column-reverse;  

    3.3. flex-wrap属性定义，如果一条轴线排不下，如何换行。
    > flex-wrap: nowrap | wrap | wrap-reverse;

    3.4. flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

    3.5. justify-content属性定义了项目在主轴上的对齐方式。

    > justify-content: flex-start | flex-end | center | space-between | space-around;

    3.6. align-items属性定义项目在交叉轴上如何对齐。

    >  align-items: flex-start | flex-end | center | baseline | stretch;

    3.7. align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

    >  align-content: flex-start | flex-end | center | space-between | space-around | stretch;

     __子级__

     3.8. order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。 
    <br/>
     3.9. flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
    <br/>
     3.10. flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
     <br/>
     3.11. flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
     <br/>
     3.12. align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

4. neat.css(reset.css)

## CSS ICON

1. [__阿里字体__](http://iconfont.cn/home)  
2. [__cssicon__](https://cssicon.space/#/)  纯css做的图标。

## 减少dom的方法

### box-shadow
> box-shadow: inset| null  x, y, blur, spread, color;

### border

### gradient (linear-gradient,radial-gradient)

#### linear-gradient

> linear-gradient(to [top|bottom|left|right] , color num(占比), .....);

#### radial-gradient

> radial-gradient(((shape || size)(at position)| at position, color-stop);	

1. __position__：主要用来定义径向渐变的圆心位置。此值类似于CSS中background-position属性，用于确定元素渐变的中心位置。如果这个参数省略了，其默认值为“center”。其值主要有以下几种：

    1.1. __length__：用长度值指定径向渐变圆心的横坐标或纵坐标。可以为负值。</br>
    1.2. __percentage__：用百分比指定径向渐变圆心的横坐标或纵坐标。可以为负值。</br>
    1.3. left：设置左边为径向渐变圆心的横坐标值。</br>
    1.4. center：设置中间为径向渐变圆心的横坐标值或纵坐标。</br>
    1.5. right：设置右边为径向渐变圆心的横坐标值。</br>
    1.6. top：设置顶部为径向渐变圆心的纵标值。</br>
    1.7. bottom：设置底部为径向渐变圆心的纵标值。</br>

2. __shape__：主要用来定义径向渐变的形状。其主要包括两个值“circle”和“ellipse”：
    2.1. circle：如果 __size__ 和 __length__ 大小相等，那么径向渐变是一个圆形，也就是用来指定圆形的径向渐变。</br>
    2.2 ellipse：如果 __size__ 和 __length__ 大小不相等，那么径向渐变是一个椭圆形，也就是用来指定椭圆形的径向渐变。</br>

3. __size__：主要用来确定径向渐变的结束形状大小。如果省略了，其默认值为“farthest-corner”。可以给其显式的设置一些关键词，主要有：

    3.1 closest-side：指定径向渐变的半径长度为从圆心到离圆心最近的边；</br>
    3.2 closest-corner：指定径向渐变的半径长度为从圆心到离圆心最近的角；</br>
    3.3 farthest-side：指定径向渐变的半径长度为从圆心到离圆心最远的边；</br>
    3.4 farthest-corner：指定径向渐变的半径长度为从圆心到离圆心最远的角；</br>

## BFC、IFC、GFC、FFC

### BFC 

> 块级元素渲染(Block Formatting Context)

__会生成BFC的元素__

1. 根元素。
2. float属性不为none。
3. position属性为obsolute或者fixed。
4. display为inline-block、table-cell、table-caption、flex、inline-flex。
5. overflow不为visible。

> 两个BFC之间是相互独立的，不重叠。
> 父级元素是BFC那么内部浮动元素参与计算。 

### IFC

> 内联格式化上下文(Inline Formatting Contex)
__高度是根据内部元素最高的撑开，不受竖直方向的padding和margin的影响。__

### GFC

> 网络布局格式化上下文(GridLayout Formatting Contex)
__当display设置为grid的时候，元素获取了一个独立的渲染区域。__

### FFC

> 自适应格式上下文(Flex Formatting Context)
__当display设置成flex或者inline-flex时产生。__

## css分层

1. SMACSS
2. BEM
3. SUIT
4. ACSS
5. ITCSS 

## background 

> background: bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;

> position/bg-size ->__后面的size代表,x方向拉伸或者缩放，y方向拉伸或者缩放__。



## 回流重绘

- **重绘(repaint)**: 当元素样式的改变不影响布局时，浏览器将使用重绘对元素进行更新，此时由于只需要UI层面的重新像素绘制，因此 **损耗较少**

- **回流(reflow)**: 当元素的尺寸、结构或触发某些属性时，浏览器会重新渲染页面，称为回流。此时，浏览器需要重新经过计算，计算后还需要重新页面布局，因此是较重的操作。会触发回流的操作:
  - 页面初次渲染
  - 浏览器窗口大小改变
  - 元素尺寸、位置、内容发生改变
  - 元素字体大小变化
  - 添加或者删除可见的 dom 元素
  - 激活 CSS 伪类（例如：:hover）
  - 查询某些属性或调用某些方法
    - clientWidth、clientHeight、clientTop、clientLeft
    - offsetWidth、offsetHeight、offsetTop、offsetLeft
    - scrollWidth、scrollHeight、scrollTop、scrollLeft
    - getComputedStyle()
    - getBoundingClientRect()
    - scrollTo()