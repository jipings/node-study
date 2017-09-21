
import net from 'net';
import fs from 'fs';

const file = fs.createWriteStream('./message.txt');

const server = net.createServer();

server.on('connection', (socket) => {
    socket.on('data', (data) => {
        console.log(data.toString(), `已接收到${ socket.bytesRead }字节数据。`);
       
    });

    socket.on('end', () => {
        console.log('客户端连接被关闭');
    });

});

server.listen(8431, 'localhost');