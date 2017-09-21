
import net from 'net';

const server = net.createServer();

server.on('connection', (socket) => {
    console.log('客户端与服务端连接已建立');
    socket.setEncoding('utf8');
    socket.on('data', (data) => {
        console.log(`已接受客户端发送的数据：${data}`);
        socket.write(`确认数据：${data}`);
    });
});

server.listen(8431, 'localhost');
