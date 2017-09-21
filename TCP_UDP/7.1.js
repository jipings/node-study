
import net from 'net';

const Log = console.log;

const server = net.createServer((socket) => {
    Log('客户端与服务端连接已建立。');

    server.getConnections((err, count) => { // 当前服务器连接的数量
        Log('当前存在%d个客户连接', count);
        server.maxConnections = 2; //设置最大服务器连接数
        Log('TCP服务器的最大连接数为%d', server.maxConnections);
    });
    server.close(() => {
        Log('TCP服务被关闭')
    });

});

server.listen(8431, 'localhost', () => {
    Log('服务端开始监听');
    const address = server.address();
    Log(`被监听的地址信息为%j`, address);
});

server.on('error', (e) => {
    if(e.code === 'EADDRINUSE') {
        Log('服务器地址及端口已被占用。')
    }
})
