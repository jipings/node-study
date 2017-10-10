import dgram from 'dgram';

const client = dgram.createSocket('udp4');

client.bind(41235, '192.168.6.2');

const buf = new Buffer('你好！');

client.send(buf, 0, buf.length, 41234, '192.168.6.2');

client.on('message', (msg, rinfo) => {
    console.log('已接受服务器发送的数据：%s',msg);
});