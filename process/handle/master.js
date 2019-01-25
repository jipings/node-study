
const cp = require('child_process');

const child1 = cp.fork('child.js');
const child2 = cp.fork('child.js');

// Open up the server object and send the handle
const server = require('net').createServer();

server.on('connection', function(socket) {
    socket.end('handle by parent \n');
});

server.listen(1337, function() {
    child1.send('server', server);
    child2.send('server', server);
});
