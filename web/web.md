
## [目录遍历攻击](http://blog.csdn.net/hxsstar/article/details/17613925)

## 从表单上传中接收用户的输入

* 处理提交的表单域
* 用formidable处理上传的文件
* 实时计算上传进度

### 处理提交的表单域
表单提交请求带的 Content-Type 值通常有两种：
    
    application/x-www-form-urlencoded ：这是html表单默认值
    multipart/form-data ：在表单中含有文件或非ASCII或二进制数据时使用。