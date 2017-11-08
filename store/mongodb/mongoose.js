
var mongoose = require('mongoose');

// 1 连接 MongoDB 数据库
var db = mongoose.connect('mongodb://localhost:27017');

// mongoose.disconnect(); // 中止连接

// 2 注册 schema

var Schema = mongoose.Schema;
var Tasks = new Schema({
    project: String,
    description: String,
});

// mongoose.model('Task', Tasks);

// 3 添加任务

var Task = mongoose.model('Task', Tasks);

var task = new Task();

task.project = 'Bikeshed';
task.description = 'Paint the bikeshed red';

task.save(function(err) {
    if(err) throw err;
    console.log('Task saved');
    search({message: {'project': 'Bikeshed'}, callback: deleteOne});
});

// 搜索文档
function search({message, callback}) {
    Task.find(message, function(err, tasks) {
        for(var i = 0; i< tasks.length; i++) {
            console.log('ID:' + tasks[i]._id);
            console.log(tasks[i].description)
        }
        callback && callback(tasks[0]._id);
    });
}


// 更新文档

function update(id) {
    Task.update(
        {_id: id},
        {description: 'Paint the bikeshed green'},
        {multi: false},
        function(err) {
            if(err) throw err;
            console.log('Update');
        }
    )
}

// 删除文档
function deleteOne(id) {
    Task.findById(id, function(err, task) {
        task.remove();
    })
}