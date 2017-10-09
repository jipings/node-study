// 创建简单的UDP客户端

import dgram from 'dgram';

const message = new Buffer("你好。");

const client = dgram.createSocket('udp4');

client.send(message, 0, message.length, 41234, "localhost", (err, bytes) => {
    if(err) console.log("发送数据失败")
    else console.log(`已发送${bytes}字节数据`);
});

client.on('message', (msg, rinfo) => {
    console.log('已接受服务器发送的数据：%s',msg);
    console.log(`服务器地址为${rinfo.address}`);
    console.log(`服务器所用端口为${rinfo.port}`);
});