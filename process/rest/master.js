
const fork = require('child_process').fork;
const cpus = require('os').cpus();

const server = require('net').createServer();

server.listen(1337);

let workers = {};

const createWorker = function() {
    const worker = fork(__dirname+'/worker.js');

    // 启动新的进程
    worker.on('message', function(message) {
        if(message.act === 'suicide') {
            createWorker();
        }
    });

    // 退出
    worker.on('exit', function() {
        console.log(`Worker ${worker.pid} exited.`);
        delete workers[worker.pid];
        // createWorker();
    });
    // 句柄转发
    worker.send('server', server);
    workers[worker.pid] = worker;
    console.log('Create worker. pid: '+ worker.pid);
};

// 进程自己退出时，让所有工作进程退出
process.on('exit', function() {
    for(let pid in workers) {
        workers[pid].kill();
    }
});


cpus.forEach(createWorker)