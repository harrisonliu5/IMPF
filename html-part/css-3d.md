# 手机陀螺仪方位

1.垂直手机屏幕的是 gamma->z轴

> z轴转动时，发生角度变化的是*alpha*的值。__作用域(0,360)__。

2.平行手机长度的是 alpha->y轴

> y轴转动时，发生角度变化的是*gamma*的值。__作用域(-90,90)__。

3.平行手机宽度的是 beta->x轴

> x轴转动时，发生角度变化的是*beta*的值。__作用域(-180,180)__。

# 获取手机陀螺仪信息

## deviceorientation

> 设备的物理方向，表示一系列本地址坐标系的角度。(静止)

    window.addEventListener("deviceorientation",(event)=>{
        //event.alpha, event.beta, event.gamma
    },true);

## devicemotion

> 设备的加速信息。(运动)

    window.addEventListener("devicemotion",(event)=>{
            //event.acceleration;
            //考虑的xyz上移动加速度的值

            //event.accelerationIncludingGravity;
            //考虑了重力加速度的值

            //event.rotationRate;
            //设备旋转的角度

        },true);

## compassneedscalibration

> 用于通知web站点使用罗盘信息校准。

    window.addEventListener("compassneedscalibration",(event)=>{
        //alert('您的罗盘需要校准‘);
        event.preventDefault();
    },true);

__css 3D 库 - (css3d-engine) / parallax__

## CSS 3D

> transform-style: preserve-3d; 开启3D模式

> transform-origin: x y z;  变化中心

> perspective: xxxpx; 透视距离

> perspective-origin: xxxpx; 透视中心
