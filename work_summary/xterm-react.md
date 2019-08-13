# react 通过 new 的方式使用第三方组件库

## 在 React 中使用 xtermJs 实现 resize 效果

### 初始化问题

1. 在react中通过组件render后，挂载到当前的div节点时，直接使用

   ```javascript
   public componentDidMount() {
       this.term = new Terminal({
           cursorBlink: true,
       });
       this.term.open(document.getElementById('xterm'));
       this.term.write('hello world');
   }
   ```

   效果：会造成xterm挂载后初始化失败，造成的效果是黑屏，什么都没有显示。

2. 想通过 fit 函数使样式恢复

   ```javascript
   import * as fit from 'xterm/lib/addons/fit/fit';
   Terminal.applyAddon(fit);

   public componentDidMount() {
       this.term = new Terminal({
           cursorBlink: true,
       });
       this.term.open(document.getElementById('xterm'));
       this.term.write('hello world');
       this.term.fit();
   }
   ```

   效果：报错 Invalid typed array length: Infinity。

3. 加上 resize 函数

   ```javascript
   public componentDidMount() {
       this.term = new Terminal({
           cursorBlink: true,
       });
       this.term.open(document.getElementById('xterm'));
       this.term.write('hello world');
        this.term.resize(80, 30);
       this.term.fit();
   }
   ```

   效果：依然报 Invalid typed array length: Infinity。

   思考：可能是react在 componentDidMount 后挂载的时机不对，于是想添加定时器。

4. 通过增加定时器可以让xterm挂载后显示打印的文字。

   ```javascript
   public componentDidMount() {
       this.term = new Terminal({
           cursorBlink: true,
       });
       setTimeout(() => {
           this.term.open(document.getElementById('xterm'));
       }, 200);
   }
   ```

   效果：会造成样式不对，字体和行高都被压缩。

5. 通过 resize 方法想重新设置 xterm 的样式。

   ```javascript
   public componentDidMount() {
       this.term = new Terminal({
           cursorBlink: true,
       });
       setTimeout(() => {
           this.term.open(document.getElementById('xterm'));
           this.term.resize(80, 30);
       }, 200);
   }
   ```

   效果：不起作用，依然会造成字体压缩。

6. 想通过 fit 方法让样式达到效果。

   ```javascript
   public componentDidMount() {
       this.term = new Terminal({
           cursorBlink: true,
       });
       setTimeout(() => {
           this.term.open(document.getElementById('xterm'));
           this.term.fit();
       }, 200);
   }
   ```

   效果：cols 和  rows 适应容器宽高，但是字体依然压缩 。

7. 然后通过增加 resize 方法使样式正常。

   ```javascript
   public componentDidMount() {
       this.term = new Terminal({
           cursorBlink: true,
       });
       setTimeout(() => {
           this.term.open(document.getElementById('xterm'));
           this.term.resize(80, 30);
           this.term.fit();
       }, 200);
   }
   ```

   效果：效果和6一样。

   思考：有没有可能是 xterm 在加载没有完成设置了 fit。

8. 于是又加了一个定时器来确认 xterm 加载完成

   ``` javascript
   public componentDidMount() {
       this.term = new Terminal({
           cursorBlink: true,
       });
       setTimeout(() => {
           this.term.open(document.getElementById('xterm'));
            setTimeout(() => {
               this.term.resize(80, 30);
               this.term.fit();
           }, 200);
       }, 200);
   }
   ```

   效果：达到了预想的效果，感觉完成了。

9. 感觉去掉resize，因为有 fit 感觉有点多余。

   效果：自适应的宽高超过了父级的宽高，所以还是需要 resize的。

> 初始化 xterm 就完成了，愉快的写伸缩的效果了。

### 在伸缩中的问题

问题：伸缩之后在输入长字符串时会错位。

原因：伸缩后新的 cols 的没有更新。

于是参考类似的项目的时，发现了下面这行代码。

``` javascript
this.socket.send(window.btoa('{"Width":' + 当前的cols + ',"Height":' + 当前的rows + '}'));
```

加完后完美解决。
