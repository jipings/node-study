
const net = require('net');

const client = net.connect({port: 8124}, () => {
    // 'connect' listener
    console.log('client connected');
    client.write('world!\r\n');
});

client.on('data', (data) => {
    console.log(data.toString('utf8'));
    client.end();
})

client.on('end', function() {
    console.log('client disconnected');
})