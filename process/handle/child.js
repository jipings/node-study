
process.on('message', function(m, server) {
    if(m === 'server') {
        server.on('connection', function(socket) {
            socket.end('handle by child, pid is'+process.pid+'\n')
        })
    }
})