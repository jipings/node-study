
## study node 

所用到的包

[body-parser](https://www.npmjs.com/package/body-parser)

[cookie-parser](https://www.npmjs.com/package/cookie-parser)

[cookie-session](https://www.npmjs.com/package/cookie-session)

[express-session](https://www.npmjs.com/package/express-session)

[method-override](https://www.npmjs.com/package/method-override)

[vhost](https://www.npmjs.com/package/vhost)

[server-static](https://www.npmjs.com/package/serve-static)

[async](http://caolan.github.io/async/)

## (Nginx)[https://zh.wikipedia.org/wiki/Nginx]

## npx
从 npm 的可执行包执行命令

  npx [选项] <命令>[@版本] [命令的参数]...

  npx [选项] [-p|--package <包>]... <命令> [命令的参数]...

  npx [选项] -c '<命令的字符串>'

  npx --shell-auto-fallback [命令行解释器]


选项：
  --package, -p          包安装的路径                                   [字符串]
  --cache                npm 缓存路径                                   [字符串]
  --install              如果有包缺失，跳过安装            [布尔] [默认值: true]
  --userconfig           当前用户的 npmrc 路径                          [字符串]
  --call, -c             像执行 `npm run-script` 一样执行一个字符串     [字符串]
  --shell, -s            执行命令用到的解释器，可选     [字符串] [默认值: false]
  --shell-auto-fallback  产生“找不到命令”的错误码
                                    [字符串] [可选值: "", "bash", "fish", "zsh"]
  --ignore-existing      忽略 $PATH 或工程里已有的可执行文件，这会强制使 npx
                         临时安装一次，并且使用其最新的版本               [布尔]
  --quiet, -q            隐藏 npx 的输出，子命令不会受到影响              [布尔]
  --npm                  为了执行内部操作的 npm 可执行文件     [字符串] [默认值:
   "/Users/apple/.nvm/versions/node/v8.1.3/lib/node_modules/npm/bin/npm-cli.js"]
  --version, -v          显示版本号                                       [布尔]
  --help, -h             显示帮助信息                                     [布尔]