# BOM对象

## location 对象

> location即是window对象的属性也是document对象的属性

### location 属性

1. hash

    "#contents" 返回url的hash,如果不包含返回空

2. host

    "www.wrox.com:80" 返回服务器名称和和端口号

3. hostname

    "www.wrox.com" 返回不带端口号的服务器名称

4. href

    返回当前加载页面的完整url

5. pathname

    "/a/" 返回url中的目录或文件名

6. port

    "8080" 返回url中指定的端口号

7. protocol

    "http" 返回页面使用的协议

8. search

    "?q=java" 返回url中查询字符串，以问号开头

### location 操作

1. location.assign(url)

    打开新链接，并在浏览器历史记录里生成一条记录

2. location.href = url;

    打开新链接，并在浏览器历史记录里生成一条记录

3. location.hash = "#detail"

     在url后添加hash

4. location.hostname = "www.baidu.com"

    修改服务器名称

5. location.pathname = "home"

    修改路径

6. location.port = 8080;

    修改端口号

7. location.replace(url)

    此方式不会在浏览器中生成新记录，用户不能回到前一个页面

8. location.reload([true])

    页面会以最有效的方式重新加载（有可能从缓存中加载），如果参数为true，则将从服务器中加载

## navigator 对象

1. navigator.language

    "zh-CN" 浏览器的主语言

2. navigator.appName

    "Netscape" 完整的浏览器名称

3. navigator.appVersion

    浏览器的版本
    5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36

4. navigator.cookieEnabled

    true 表示cookie是否启用

5. navigator.javaEnabled()

    表示浏览器是否启用java

6. navigator.onLine

    true 表示浏览器是否连接到了因特网

7. navigator.platform

    "Win32" 浏览器所在的系统平台

8. navigator.userAgent

    浏览器用户代理字符串
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)
    AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36"

9. navigator.plugins

    检测浏览器中安装的插件的数组

## history 对象

1. history.go(0 | [123] | -1 | str)

    如果是Str,则会跳转到历史记录中包含该字符串的第一个位置

2. history.back()

    退一页

3. history.forward()

    进一页

4. history.length

    保存着历史纪录的数量
