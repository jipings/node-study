
const cp = require('child_process');
const cpus = require('os').cpus(); // cpu个数

cp.spawn('node', ['worker.js']);
cp.exec('node worker.js', function(err, stdout, stderr) {
    console.log(err, stdout, stderr);
})

cp.execFile('worker.js', function(err, stdout, stderr) {

})

cp.fork('./worker.js')