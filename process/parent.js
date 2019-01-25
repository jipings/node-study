
const cp = require('child_process');
const n = cp.fork(__dirname+'/sub.js');

n.on('message', function(m) {
    console.log('PARENT got message:\n', m);
});

n.send({hello: 'world'});