
## [Jest JavaScript测试](http://facebook.github.io/jest/zh-Hans/)

完整且只需建议设置的 JavaScript 测试解决方案。任何 React 程序都能从容使用。

快速交互式监视模式仅运行到更改的相关文件并能快速发出信号。

### 高速和沙盒

Jest 跨工人以最大化性能并行化的测试运行。控制台消息都是缓冲并输出测试结果。沙盒测试文件和自动全局状态将为每个测试重置，因此测试代码间不会冲突。

### 内置代码覆盖率报告

使用 ' --coverage ' 参数来轻松地创建代码覆盖率报告。无需额外安装程序或代码库 ！Jest 可以从整个项目包括未经测试的文件收集代码覆盖率信息

### 零配置

在你使用 create-react-app 或 react-native init 创建你的 React 或 React Native 项目时，Jest 都已经被配置好并可以使用了。在 __tests__文件夹下放置你的测试用例，或者使用 .spec.js 或 .test.js 后缀给它们命名。不管你选哪一种方式，Jest 都能找到并且运行它们。