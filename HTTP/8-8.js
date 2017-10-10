// data事件和end事件回调函数的使用

import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    if(req.url !== "/favicon.ico") {
        req.on('data', (data) => {
            console.log(`服务端接受到数据：${decodeURIComponent(data)}`);
        });
        req.on('end', () => console.log('客户端请求数据已全部接收'));
    }
    res.end();
}).listen(1337,'localhost',() => {console.log('开始监听')});