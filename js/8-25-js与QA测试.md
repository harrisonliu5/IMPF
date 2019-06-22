# QA测试

- 正确性：测试可以验证代码的正确性。
- 自动化：做到一次编写，多次运行。
- 解释性：测试用例用于接口，模块，那么在阅读测试用例时比文档更清晰。
- 驱动开发，指导设计：TDD,先做出API的设计
- 保证重构：为了保证重构后的代码质量，用测试用例。

## 单元测试

使用框架：karma

目的：能够让开发者明确代码结果。

原则：单一职责、接口抽象、层次分离。

断言库：保证最小单元是否正常运行检测方法。

测试风格：

1. 测试驱动开发 TDD(Test-Driven Development)

     关注所有功能是否被实现。

2. 行为驱动开发 BDD(Behavior Driven Development)

    关注整体行为是否符合整体预测。

常用的测试框架:

1. Jasmine.js(BDD)
2. chai.js(TDD,BDD)

### 单元测试运行流程 

每一个测试用例组通过describe进行设置

before  - beforeEach - it - after - afterEach

### 自动化单元测试

karma 自动化runner集成PhantomJS无刷新

### 报告和单测覆盖率检查

- npm install karma-coverage —save-dev

- coverageReporter: { type: 'html',dir: 'coverage/' } //配制代码覆盖测试率生成结果

## 性能测试

使用框架 Benchmark.js

### 基准测试

Benchmark基准测试方法，它并不是简单地统计 执行多少次测试代码后对比时间，它对测试有着 严密的抽样过程。执行多少次取决于采样到的数 据能否完成统计。根据统计次数计算方差。

## E2E测试 页面功能

使用框架 selenium或者nightwatch

## 接口测试 测试API

使用框架 mocha

1 全局执行命令行
2 把你需要的那个包文件写到 js 文件里 node执行它
3 mocha done要记住

## 页面UI自动化测试

使用框架：backstopjs

sudo yarn global add backstopjs
backstop init
backstop test 注意图片的格式

## jasmin语法

### describe测试包（官方称之为suite）

describe 是 Jasmine 的全局函数，作为一个 Test Suite 的开始，它通常有 2 个参数：字符串和方法。字符串作为特定 Suite 的名字和标题。方法是包含实现 Suite 的代码。

### it测试用例（官方称之为spec） 

it 有 2 个参数，字符串和方法。
每个 Spec 包含一个或多个 expectations 来测试需要测试代码。
Jasmine 中的每个 expectation 是一个断言，可以是 true 或者 false。
当每个 Spec 中的所有 expectations 都是 true，则通过测试。有任何一个 expectation 是 false，则未通过测试。而方法的内容就是测试主体。