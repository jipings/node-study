// 设置服务器超时
import http from 'http';

const server = http.createServer((req, res) => {
    res.end();
}).listen(1337, '127.0.0.1', () => {
    console.log('开始监听')
});

server.setTimeout(12000, (socket) => {
    console.log('服务器超时');
    console.log(socket);
});