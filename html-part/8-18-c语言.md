# 基本C语言

机器语言-》汇编语言-》低级语言-》高级语言

## 与js的异同点

- C语言是编译语言，js是解释型语言
- C语言要借助编译器转换成可执行程序，js要借助解释引擎运行
- C语言没有面向对象。

## 与C++的区别

1. C++是C语言的超级。C++完全兼容C的语法和特性。
2. C++是面向对象，C是面向过程的。
3. C++和C都有标注库，但C++是可以用C的标准库但C不能用C++的标准库。
4. C++大多用在复杂引擎和应用软件，如桌面软件。
5. C大多用在网络相关和嵌入式等。 

## 配置

- window: Visual C++/MingWin
- Linux: gcc/g++
- Mac: Xcode/gcc
推荐Linux/unit/Mac

## 语法

    #include <stdio.h>  //引用
    
    int main(int argc, char const *argv[]) //
    {
        printf("hello world! \n");
        return 0;
    } 


## 编译 

gcc 文件名

