// 指定服务器地址及端口已被占用时需要执行的处理

import http from 'http';

const server = http.createServer((req, res) => {

}).listen(1337,'127.0.0.1',() => {
    console.log('服务端开始监听');
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.log('服务器地址及端口已被占用。')
    }
})
