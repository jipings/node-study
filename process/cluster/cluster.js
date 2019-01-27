
const cluster = require('cluster');

cluster.setupMaster({
    exec: "Worker.js"
});

const cpus = require("os").cpus();

cpus.forEach(() => {
    cluster.fork();
})