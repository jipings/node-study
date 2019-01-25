
process.on('message', function(m) {
    console.log('CHILD got message: \n', m);
});

process.send({foo: 'bar'})