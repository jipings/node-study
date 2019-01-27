
const http = require('http');

const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('handle by child, pid is: '+process.pid+'\n');
    throw new Error('throw exception')
})
let worker;
process.on('message', function(m, tcp) {
    if(m === 'server') {
        worker = tcp;
        worker.on('connection', function(socket) {
            // socket.end('handle by child, pid is'+process.pid+'\n')
            server.emit('connection', socket);
        })
    }
})

process.on('uncaughtException', function(err) {
    // TODO 需要记录err 日志
    process.send({act: 'suicide'});
    // 停止接收新的连接
    worker.close(function() {
        // 所有已有连接断开后，退出进程
        process.exit(1)
    })
})