// 创建简单的UDP服务器

import dgram from 'dgram';

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
    console.log(`已接受客户端发送的数据${msg}`);
    console.log(`客户端地址信息为${JSON.stringify(rinfo)}`);
    const buf = new Buffer("确认信息："+msg);
    server.send(buf, 0, buf.length, rinfo.port, rinfo.address);
});

server.on('listening', () => {
    const address = server.address();
    console.log(`服务器开始监听。地址信息为${JSON.stringify(address)}`);
});

server.bind(41234, 'localhost');