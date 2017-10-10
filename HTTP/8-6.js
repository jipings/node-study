// 在文件中保存客户端请求信息

import http from 'http';

import fs from 'fs';

const server = http.createServer((req, res) => {
    if(req.url !== '/favicon.ico') {
        const out = fs.createWriteStream('./request.log');
        out.write(`客户端请求所用方法为：${req.method}\r\n`);
        out.write(`客户端请求所用的url为：${req.url}\r\n`);
        out.write(`客户端请求的对象为：${JSON.stringify(req.headers)}\r\n`);
        out.end(`客户端请求所用HTTP版本为：${req.httpVersion}\r\n`);
    }
    res.end();
}).listen(1337, 'localhost', () => console.log('开始监听'));