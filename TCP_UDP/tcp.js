
const net = require('net');

const server = net.createServer((socket) => {
    // 新的连接
    socket.setNoDelay(true);
    socket.on('data', (data) => {
        socket.write('hello '+data.toString());
    });

    socket.on('end', function(data) {
        console.log('disconnect')
    });

    socket.write('welcome!');
});

server.listen(8124,() => {
    console.log('server is running')
})