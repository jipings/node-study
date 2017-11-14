
## [Jest JavaScript测试](http://facebook.github.io/jest/zh-Hans/)

完整且只需建议设置的 JavaScript 测试解决方案。任何 React 程序都能从容使用。

快速交互式监视模式仅运行到更改的相关文件并能快速发出信号。

### 高速和沙盒

Jest 跨工人以最大化性能并行化的测试运行。控制台消息都是缓冲并输出测试结果。沙盒测试文件和自动全局状态将为每个测试重置，因此测试代码间不会冲突。

### 内置代码覆盖率报告

使用 ' --coverage ' 参数来轻松地创建代码覆盖率报告。无需额外安装程序或代码库 ！Jest 可以从整个项目包括未经测试的文件收集代码覆盖率信息

### 零配置

在你使用 create-react-app 或 react-native init 创建你的 React 或 React Native 项目时，Jest 都已经被配置好并可以使用了。在 __tests__文件夹下放置你的测试用例，或者使用 .spec.js 或 .test.js 后缀给它们命名。不管你选哪一种方式，Jest 都能找到并且运行它们。

### 在命令行运行

你可以直接通过 CLI 运行 Jest (如果它已经在你的全局路径 PATH 中，比如通过 npm install -g jest 来安装) ，并指定各种有用的选项。

这里演示了如何对能匹配到 my-test 的文件运行 Jest、使用config.json 作为一个配置文件、并在运行完成后显示一个原生的操作系统通知。

    jest my-test --notify --config=config.json

### 使用 Babel 

要使用 Babel，请安装 babel-jest 和 regenerator-runtime 两个包：

    npm install --save-dev babel-jest regenerator-runtime

注意：如果你使用了 npm 3 或 4，或者 Yarn，就不用再显式的安装 regenerator-runtime 这个包了。

别忘了在你的项目根文件夹下添加一个 .babelrc 配置文件。 比如，如果你正在通过 babel-preset-es2015 和 babel-preset-react 这两个 presets 来使用 ES6 和 React.js:

```js
{
  "presets": ["es2015", "react"]
}
```
现在你就完成了使用所有 ES6 特性和 React 特殊语法所需的配置了。

注意：如果你正在使用一个更复杂的 Babel 配置，并使用 Babel 的 env 选项，请记住 Jest 将会自动定义 NODE_ENV 为 test。 它不会像 Babel 那样在 NODE_ENV 没有被设置时默认使用 development。

```js
{
  "presets": [["es2015", { "modules": false }], "react"],
  "env": {
    "test": {
      "presets": [["es2015"], "react"]
    }
  }
}
```