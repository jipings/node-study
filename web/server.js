// 基本的ReadStream 静态文件服务器
var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;

var server = http.createServer((req, res) => {
    var url = parse(req.url);
    var path = join(root, url.pathname); // 构造绝对路径
    var stream = fs.createReadStream(path); // 创建fs.ReadStream
    stream.pipe(res); // res.end() 会在steam.pipe()内部调用
});

server.listen(3000, () => {console.log('🌍 server listening on 3000 port')});