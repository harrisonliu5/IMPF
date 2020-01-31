# SPA Webpack配置

> React 16.8 以上 + TypeScript + Webpack + less 单页配置。

## 用到的依赖包

``` json
{
  "devDependencies": {
  	"@babel/core": "^7.8.4",
		"@babel/plugin-proposal-class-properties": "^7.8.3",
		"@babel/plugin-proposal-decorators": "^7.8.3",
		"@babel/plugin-syntax-dynamic-import": "^7.8.3",
		"@babel/preset-react": "^7.8.3",
		"@babel/preset-typescript": "^7.8.3",
		"@types/react-dom": "^16.9.5",
		"babel-loader": "^8.0.6",
		"babel-plugin-import": "^1.13.0",
		"css-loader": "^3.4.2",
		"html-webpack-plugin": "^3.2.0",
		"less": "^3.10.3",
		"less-loader": "^5.0.0",
		"mini-css-extract-plugin": "^0.9.0",
		"optimize-css-assets-webpack-plugin": "^5.0.3",
		"postcss-loader": "^3.0.0",
		"postcss-preset-env": "^6.7.0",
		"progress-bar-webpack-plugin": "^2.1.0",
		"typescript": "^3.7.5",
		"webpack": "^4.41.5",
		"webpack-build-notifier": "^2.0.0",
		"webpack-cli": "^3.3.10",
		"webpack-dev-server": "^3.10.3",
		"webpack-merge": "^4.2.2",
		"yargs-parser": "^16.1.0"
	},
  "dependencies": {
      "@types/react": "^16.9.19",
      "@types/react-router-dom": "^5.1.3",
      "react": "^16.12.0",
      "react-dom": "^16.12.0",
      "react-router": "^5.1.2",
      "react-router-dom": "^5.1.2"
  }
}
```

## 配置流程

1. 通用配置

   ``` javascript
   const { resolve, join } = require("path");
   
   // 该插件将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。它支持CSS和SourceMap的按需加载。
   const MiniCssExtractPlugin = require("mini-css-extract-plugin");
   
   module.exports = {
     entry: resolve(src/index.tsx), 			// 入口配置
     output:{														// 出口配置
       path: join(__dirname,"dist"), 
       publicPath:'/',
     },
     module:[														// loader配置
       {
         test: /\.(js|jsx|ts|tsx)$/,			// 配置js、ts，loader
         include: resolve("src"),
         exclude: "/node_module/",				// 不处理依赖包的js文件
         use: ["babel-loader"],					// 用babel-loader编译，还可以用awsome-typescript-loader
       },{
         test: /\.css$/,									// 配置css，根据不同环境会有不同的配置
         exclude: "/node_module/",
         use:[
           	MiniCssExtractPlugin.loader, 
           {
             loader: "css-loader",
             options: {
               module:{
                 localIndexName: "[name]__[local]--[hash:base64:5]", // 开启css module
               },
               importLoaders: 1, 				// 允许在css-loader之前可以使用多少个loader
             }
           },"postcss-loader"
         ],
       },{
         test: /\.less/,
         exclude: "/node_module/",
         use:[ MiniCssExtractPlugin.loader,
            {
             loader: "css-loader",
             options: {
               module:{
                 localIndexName: "[name]__[local]--[hash:base64:5]", // 开启css module
               },
             }
           },"less-loader","postcss-loader"
         ]
       }
     ]
   };
   ```
   

   
2. 通过 **yargs-parser** 获取当前是开发环境还是生产环境

  ``` javascript
  const argv = require("yargs-parser")(process.argv.slice(2));
  ```

