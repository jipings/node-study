import net from 'net';

const client = new net.Socket();

client.setEncoding('utf8');

client.connect(8431, 'localhost', () => {
    console.log('已连接到服务器');
    client.write('你好');
});
client.on('data', (data) => {
    console.log(`已接受到服务端发送的数据${data}`);
})