
const http = require('http');

const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('handle by child, pid is: '+process.pid+'\n');
})

process.on('message', function(m, tcp) {
    if(m === 'server') {
        tcp.on('connection', function(socket) {
            // socket.end('handle by child, pid is'+process.pid+'\n')
            server.emit('connection', socket);
        })
    }
})