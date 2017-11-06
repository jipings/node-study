
## mongodb.md

* 通过 `mongod` 命令启动数据库

* mongoDB 的文档标识符是二进制的JSON(BSON).BSON是MongoDB用来交换数据的主要数据格式，MongoDB 服务器用它代替JSON 交换数据。大多数情况下，它更节省空间，解析起来也更快。占用空间更少，扫描更容易意味着交互更快。

* `npm install bson`