
const tls = require('tls');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./keys/client.key'),
    cert: fs.readFileSync('./keys/client.crt'),
    // requestCert: true,
    ca: [ fs.readFileSync('./keys/ca.crt') ]
};

const socket = tls.connect(8000, options, () => {
    console.log('client connected',
    socket.authorized ? 'authorized' : 'unauthorized')
    process.stdin.pipe(socket);
    process.stdin.resume();
});

socket.setEncoding('utf8');
socket.on('data', () => {
    console.log(data);
});

socket.on('end', () => {
    console.log('client ends')
})

