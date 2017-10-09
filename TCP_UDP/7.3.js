var net = require('net');
var file = require('fs').createWriteStream('./message.txt');
var server = net.createServer();
server.on('connection', function(socket) {
    socket.setEncoding('utf8');
    socket.on('data', (data) => {
        
        console.log(data);
        socket.pipe(file);
    })
    
});
server.listen(8431,'localhost');