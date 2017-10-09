import net from 'net';
import fs from 'fs';

const client = new net.Socket();

client.setEncoding('utf8');

client.connect(8431, 'localhost', () => {
    console.log('已连接到服务器');
    const readStream = fs.createReadStream('./message.txt');
    readStream.on('data', (data) => {
        // console.log('data',data.toString());
        client.write(data);
        console.log(`当前已发送${client.bytesWritten}字节`);

    })
    
});
client.on('data', (data) => {
    console.log(`已接受到服务端发送的数据${data}`);
});
client.on('error',(err) => {
    console.log(`与服务端连接或通信过程中发生了一个错误，错误编码为${err.code}`);
    client.destroy();
})