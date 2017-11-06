// 命令行版本的代办事项

var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);

// console.log(args,process.argv);

var command = args.shift();
var taskDecription = args.join(' ');
var file = path.join(process.cwd(), '/.tasks');

switch (command) {
    case 'list':
        listTasks(file);
        break;
    
    case 'add':
        addTask(file, taskDecription);
        break;

    default:
        console.log('Usage: '+ process.argv[0]+ 'list | add [taskDescription]');
}

// 从文本中加载用json编码的数据

function loadOrInitializeTaskArray(file, cb) {
    fs.exists(file, function(exists) {
        var tasks = [];
        if(exists) {    // 检查 .tasks 文件是否已经存在
            fs.readFile(file, 'utf8', function(err, data) {  // 从.tasks文件读取数据，并编码添加到代办事项的任务数组中
                if(err) throw err;
                var data = data.toString();
                tasks = JSON.parse(data || '[]');
                cb(tasks);
            })
        } else { // 如果文件不存在则创建任务数组
            cb([]);
        }
    })
}

function listTasks(file) { // 列出任务函数
    loadOrInitializeTaskArray(file, function(tasks) {
        for(var i in tasks) {
            console.log(tasks[i])
        }
    })
};

// 把任务保存到磁盘中

function storeTasks(file, tasks) {
    fs.writeFile(file, JSON.stringify(tasks), 'utf8', function(err) {
        if(err) throw err;
        console.log('Saved'); 
    })
}

function addTask(file, taskDescription) {
    loadOrInitializeTaskArray(file, function(tasks) {
        tasks.push(taskDecription);
        storeTasks(file, tasks);
    })
}