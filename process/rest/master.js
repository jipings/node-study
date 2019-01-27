
const fork = require('child_process').fork;
const cpus = require('os').cpus();

const server = require('net').createServer();

server.listen(1337);

let workers = {};
// 限制重启
const limit = 10;
// 时间单位
const during = 60000;
const restart = [];
const isTooFrequently = function() {
    // 记录重启时间
    const time = Date.now();
        restart.push(time);
    const length = restart.length;
    if(length > limit) {
        // 取出最后10个记录
        restart = restart.slice(limit * -1);
    };
    // 最后一次重启到前10次重启之间的时间间隔
    return restart.length >= limit && restart[restart.length - 1] - restart[0] < during;
}

const createWorker = function() {
    // 检查是否太过频繁
    if(isTooFrequently()) {
        // 触发giveUp 事件后， 不再重启
        process.emit('giveup', restart.length, during);
        return;
    }
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