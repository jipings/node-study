
## Cookie

Cookie 的处理分为如下几步
1) 服务器向客户端发送Cookie
2) 浏览器将Cookie保存
3) 之后每次浏览器都会将Cookie发向服务器端

* Set-Cookie: name=value; Path=/; Expires=Sun, 23-Apr-23 09:01:35 GMT; Domain=.domain.com;
以下为主要的几个选项

1) path 表示这个Cookie影响到的路径，当前访问的路径不满足该匹配时，浏览器则不发送这个Cookie
2) Expires 和 Max-Age 是用来告知浏览器这个Cookie何时过期的，如果不设置该选项，在关闭
浏览器时会丢失掉这个Cookie。如果设置了过期时间，浏览器将会把Cookie内容写入到磁
盘中并保存，下次打开浏览器依旧有效。Expires的值是一个UTC格式的时间字符串，告
知浏览器此Cookie何时将过期，Max-Age则告知浏览器此Cookie多久后过期。前者一般而
言不存在问题，但是如果服务器端的时间和客户端的时间不能匹配，这种时间设置就会存
在偏差。

3) httpOnly 告知浏览器不允许通过脚本document.cookie去更改这个Cookie值，事实上，设置
HttpOnly之后，这个值在document.cookie中不可见。但是在HTTP请求的过程中，依然会
发送这个Cookie到服务器端。

4) Secure。当Secure值为true时，在HTTP中是无效的，在HTTPS中才有效，表示创建的Cookie只能在HTTPS连接中被浏览器传递到服务器端进行会话验证，如果是HTTP连接则不会传
递该信息，所以很难被窃听到。