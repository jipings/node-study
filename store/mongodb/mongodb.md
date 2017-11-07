
## mongodb

* 通过 `mongod` 命令启动数据库

* mongoDB 的文档标识符是二进制的JSON(BSON).BSON是MongoDB用来交换数据的主要数据格式，MongoDB 服务器用它代替JSON 交换数据。大多数情况下，它更节省空间，解析起来也更快。占用空间更少，扫描更容易意味着交互更快。

* `npm install bson`

## [mongoose](https://mongoose.shujuwajue.com/)

### 名词解释

* Schema： 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力

* Model：由 Schema 发布生成的模型，具有抽象属性和行为的数据库操作对象。

* Entity：由 Model 创建的实体，他的操作也会影响数据库。

