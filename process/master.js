
const fork = require('child_process').fork;
const cpus = require('os').cpus(); // cpu个数

for (var i = 0; i< cpus.length; i++) {
    fork('./worker.js');
}