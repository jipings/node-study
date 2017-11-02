// 基本的ReadStream 静态文件服务器
var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;

var server = http.createServer((req, res) => {
    var url = parse(req.url);
    var path = join(root, url.pathname); // 构造绝对路径
    
    fs.stat(path, (err, stat) => {
        if(err) {
            if('ENOENT' == err.code) {
                res.statusCode = 404;
                res.end();
            } else {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        } else {
            res.setHeader('Content-Length', stat.size);
            var stream = fs.createReadStream(path); // 创建fs.ReadStream
            stream.pipe(res); // res.end() 会在steam.pipe()内部调用
            stream.on('error', (err) => {
                res.statusCode = 500;
                res.end('Internal Server Error');
            });
        }
    })
    
});

server.listen(3000, () => {console.log('🌍 server listening on 3000 port')});