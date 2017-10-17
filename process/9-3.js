// 使用nextTick方法指定一个函数在一个同步方法执行完毕时被调用

var fs = require('fs');
var finish = function() {
    console.log('文件读取完毕');
};

process.nextTick(finish);

console.log(fs.readFileSync('./9-1.js').toString());