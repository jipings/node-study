
## authorization

    curl --user tobi:ferret http://localhost:3000/admin/users

## cookie-parser 解析 http cookie

    JSON cookie 带有前缀j

`curl http://localhost:3000/ -H 'Cookie: foo=bar, bar=j:{"foo":"bar"}'`


## body-parser 解析请求主体

    解析JSON数据
    curl -d '{"username": "tobi"}' -H "Content-Type: application/json" http://localhost:3000 

    解析常规的<Form> 数据
    curl -d name=tobi http://localhost:3000

    解析 multipart <form> 数据
    curl -F image=@photo.png -F name=tobi http://localhost:3000
    使用 `connect-multiparty` 模块

```js
    var multipart = require('connect-multiparty');
    var multipartMiddleware = multipart();
    app.post('/upload', multipartMiddleware, function(req, resp) {
    console.log(req.body, req.files);
    // don't forget to delete all req.files when done
    });
```