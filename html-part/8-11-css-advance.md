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

1. box-shadow
> box-shadow: inset| null  x, y, blur, spread, color;

2. border
3. gradient (linear-gradient,radial-gradient)

> linear-gradient(to [top|bottom|left|right] , color num(占比), .....);

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
