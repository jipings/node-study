
## [目录遍历攻击](http://blog.csdn.net/hxsstar/article/details/17613925)

## 从表单上传中接收用户的输入

* 处理提交的表单域
* 用formidable处理上传的文件
* 实时计算上传进度

### 处理提交的表单域
表单提交请求带的 Content-Type 值通常有两种：
    
    application/x-www-form-urlencoded ：这是html表单默认值
    multipart/form-data ：在表单中含有文件或非ASCII或二进制数据时使用。

### 用formidable处理上传的文件

以高效流畅的方式处理上传的文件。formidable 就是其中之一。
用于媒体的上传和转换，性能和可靠性很关键。

formidable 的流失解析器让它成为了处理文件上传的绝佳选择，也就是说它能随着数据块的上传接收它们，解析它们，并吐出特定部分，就像我们之前提到的请求头和请求主体。
这种方式不仅快，还不会因为需要大量缓冲而导致内存膨胀，即便大型像视频这种大型文件，也不会将进程压垮。

### https 加强程序的安全性

生成私钥文件
```js
    openssl genrsa 1024 > key.pem
```
生成 key-cert.pem 证书
```js
    openssl req -x509 -new -key key.pem > key-cert.pem
```