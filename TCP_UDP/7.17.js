import net from 'net';
import fs from 'fs';

const server = net.createServer();

server.on('connection', (socket) => {
    console.log('客户端与服务端连接已建立');
    socket.setEncoding('utf8');
    const readStream = fs.createReadStream('./server.js');
    readStream.on('data', (data) => {
        const flag = socket.write(data);
        console.log(`write方法中的返回值为：${flag}`);
        console.log(`缓存队列中当前缓存了字符${socket.bufferSize}`);
    });
    socket.on('data', (data) => {
        console.log('已接受客户端发送的数据');
    });
    socket.on('drain', () => {
        console.log('TCP缓存区的数据已全部发送');
    })
});

server.listen(8431, 'localhost');