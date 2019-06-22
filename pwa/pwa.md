# PWA

## PWA好处

1.响应式：用户界面可以兼容多设备。
2.应用化：交互体验接近native应用。
3.网络依赖低。
4.延续性：借助推送功能

## PWA核心技术

### service Work

通过拦截网络请求，使得网站运行更快，或者在离线情况下，依然可以执行。

1. 判断是否支持serviceWorker

``` javascript
    // 先注册serviceWorker
    if("ServiceWorker" in window){
        navigator.serviceWorker.register("/sw.js")
        .then(function(registation){
            console.log(registation.scope);
        }).catch(function(err){
            console.log(err)
        })
    }
```

2. 编写更新文件的js文件

``` javascript
    // sw.js

    // skipWaiting 表示当前处在 waiting 状态的脚本进入active状态
    const cacheName = "xxx"; //初始化版本号用于缓存更新
    const filesToCache = []; // 需要缓存的文件

    // 加入缓存列表 强制缓存更新
    function updateStaticCache(){
        return caches.open(cacheName)
        .then(function(cache){
            return cache.addAll(fileToCache);
        })
        .then(()=>self.skipWaiting());
    }

    //首次安装完成时,装载缓存,只执行一次
    self.addEventListener("install",(event)=>{
        event.waitUntil(updateStaticCache());
    }) 

    // 激活成功，更新静态文件
    self.addEventListener("activate",()=>{
        event.waitUntil(caches.keys().then(function(keyList){
            return Promise.all(keyList.map(function(key){
                //更换key
                if(key !== cacheName){
                    return caches.delete(key);
                }
            }));
        });
    });

    //l拦截所有的请求
    self.addEventListener("fetch",(event)=>{
        // 找到真正的缓存
        // 获得所有的请求event.request
        event.respondWith(caches.match(event.request).then(function(res){
            return res || fetch(event.request)
        }));
    }) ;

```

workbox