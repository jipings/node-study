
## HTTP

* 在默认情况下，客户端与服务端每进行一次HTTP操作，都将建立一次连接，客户端与服务端之间的交互通信完成后该连接就中断。在http1.1中，添加了长
连接支持。如果客户端发出的请求头信息或者服务端发出的响应头信息中加入了`Connection:keep-alive`信息，则http连接继续保持，客户端可以继续通过
相同的连接向服务端发送请求。

在node.js中，当客户端与服务端建立连接时，触发HTTP服务对象的`connection`事件

```js
server.on('connection', () => {
    // todo
})
```
* server.close(); 关闭服务器
```js
server.on('close', function() {
    // todo
});
```
```js
server.on('error', function(e) {
    if(e.code === 'EADDRINUSE') {
        // 端口被占用
    }
})
```

* http Keep-Alive 属性
Http协议采用 请求-应答 模式，不开启KeepAlive模式时，每个 req/res 客户端和服务端都要新建一个连接，完成之后立即断开连接（HTTP协议为无连接的协议）；当开启 Keep-Alive 模式（又称持久连接，连接重用）时，Keep-Alive功能使客户端到服务器的连接持续有效，当出现对服务器的后继请求时，Keep-Alive 功能避免了建立或者重新建立连接。

