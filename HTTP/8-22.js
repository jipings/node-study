// 用于接收数据的http服务器

import http from 'http';
const server = http.createServer((req, res) => {
    if(req.url !== '/favicon.ico') {
        req.on('data', (data) => {
            console.log(`服务端收到数据：${data}`);
            
            res.write(`确认数据:${data}`);
        });
        req.on('end', () => {res.end();});
    }
}).listen(1337, '127.0.0.1');

