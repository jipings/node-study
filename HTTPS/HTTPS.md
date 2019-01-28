HTTPS 是基于 TLS/SSL 的 HTTP 协议。在 Node.js 中，它被实现为一个独立的模块。

* SSL ( Secure Sockets Layer, 安全套接层)，SSL作为一种安全协议，它在传输层提供对网络加密的功能
* TLS ( Transport Layer Security, 安全传输协议) 最初的SSL应用在web上，被服务器端和浏览器端同时支持，随后IEIF将其标准化。

* 生成服务端私钥
    
    openssl genrsa -out server.key 1024

* 生成客户端私钥

    openssl genrsa -out client.key 1024

* 生成对应的公钥

    openssl rsa -in server.key -pubout -out server.pem

## 中间人攻击
公私钥的非对称加密虽好，但是网络中依然可能存在窃听的情况，典型的例子是中间人攻击。
客户端和服务端在交换公钥的过程中，中间人对客户端扮演服务端的角色，对服务端扮演客户端的角色，因此服务端和服务端几乎感受不到中间人的存在。为了解决这种问题，数据传输过程中还需要对得到的公钥进行认证，以确认得到的公钥是出自目标服务器。

## 数字证书

为了解决中间人攻击问题， TLS/SSL 引入了数字证书认证，数字证书包含了服务器的名称和主机名、服务器的公钥、签名颁发机构的签名。在连接建立前，会通过证书中的签名确认收到的公钥是来自目标服务器的，从而产生信任关系。

为了确保我们的数据安全，我们需要引入一个第三方：CA（Certificate Authority, 数字证书认证中心）。CA的作用是为站点颁发证书，且这个证书中具有CA通过自己的公钥和私钥实现的签名。

为了得到签名证书，服务器端需要通过自己的私钥生成CSR(`Certificate Signing Request`，证书签名请求)文件。CA机构将通过这个文件颁发属于该服务器的签名证书，只要通过CA机构就能验证证书是否合法。

通过CA机构颁发证书通过是繁琐的过程，中小型企业，多半采用自签名证书。

* 自签名

自己扮演CA机构，给自己的服务器颁发签名证书，生成私钥，生成CSR文件、通过私钥自签名证书的过程

    openssl genrsa -out ca.key 1024
    openssl req -new -key ca.key -out ca.csr
    openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt

Common Name要匹配服务器域名，否则在后续的认证过程中会出错

* 生成csr文件

    openssl req -new -key server.key -out server.csr

* 得到CSR文件后，向我们自己的CA机构申请签名吧。签名过程需要CA的证书和私钥参与， 最终颁发一个带有CA签名的证书，如下所示:

    openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt