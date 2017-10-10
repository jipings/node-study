import dgram from 'dgram';

const server = dgram.createSocket('udp4');

server.on('message', (msg,rinfo) => {
    const buf = new Buffer(`已接受客户端发送的数据：${msg}`);
    server.setBroadcast(true);

    server.send(buf, 0, buf.length, rinfo.port, rinfo.address);
});

server.bind(41234, '192.168.6.2');