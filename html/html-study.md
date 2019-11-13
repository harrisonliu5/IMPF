# HTML

## 同源政策

1. 协议相同
2. 域名相同
3. 端口相同  *(默认端口80)*

__浏览器不同域名不能相互访问cookie,但是内部提交表单不受限制__

### 限制范围

1. Cookie、Localstorage、IndexDB。
2. DOM无法获取。
3. AJAX不能发送。

--------------------------------------------

### 如何设置同源策略(前端跨域几种方式)

1. host

        text.xxx.com/a.html
        <script>
        document.domain = 'xxx.com'; //设置同源
        document.cookie = 'text1=hello';
        </script>
    
        text2.xxx.com/b.html
        <script>
        document.cookie
        </script>

    *img、iframe、script(jsonp)、link(background)是可以不受同源策略的限制*

2. jsonp (script)

        <script type="text/javascript">
            function text(data){
                console.log(data);
            }
        </script>
        <script type="text/javascript" src="www.xxxx.com?callback=text"></script>

3. img(代码压缩进图片)
> crossorigin 属性 anonymous ,use-credentials

        var start = Date.now();
        var s = new Image();
        s.src = "http://www.dddd.com/s.gif";
        s.onload = function(){
            var end = Date.now();
            t = end - start;
            v = '1.1'/t + 'kb/s'; //0-100;
            var level = 10 - Math.floor(v/100)
        }

4. websocket

5. postmessage(iframe,image);

6. cors

## xss注入

> 使用css的url,src等可以跨域的属性写入js代码进行xss注入

## HTML语义化

- 使用div布局，但不要过多的用div包裹无意义的内容。
- 尽量少使用无意义的div和span，语义不明显时多使用p。
- 需要强调，使用strong和em，不使用b和i。
- 使用表格时，标题要加caption，表头用thead，主体用tbody，底部用tfoot。

        <header>
            <nav></nav>
        </header>
    
        <div>
            <section></section>
            <section></section>
        </div>
    
        <footer></footer>

### 尽量少写html标签

*减少dom渲染时间，浪费整个文件大小。*
*1个html标签最少可以代替3个标签。*

<http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html>
