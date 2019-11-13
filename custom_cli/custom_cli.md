# 做一个自己的CL

## 流程

在mac上

1. 先创建一个package的默认项目

   ```javascript
   npm init -y
   ```

 2.  创建一个bin文件夹，用来当做整个项目的入口文件夹

 3.  在bin文件夹中创建文件

     ```javascript
     #!/usr/bin/env node //用于关联到系统的npm包文件夹里
     ```

 4.  与package关联bin的里文件

     ```javascript
     sudo npm link
     ```

	5. 根据用户输入的命令进行分别的操作

    ```
    const program = require("commander")
    ```

    

	6. 



## 工具库

### [figlet](https://www.npmjs.com/package/figlet)

> 用于将文字转成代码的工具包

### [lolcatjs](https://www.npmjs.com/package/@darkobits/lolcatjs)

> 用于字体代码变色

### [commander](https://www.npmjs.com/package/commander)

> 获取用户的命令行

### [inquirer](https://www.npmjs.com/package/inquirer)

> 和用户交互

