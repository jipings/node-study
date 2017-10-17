// 使用nextTick方法指定两个耗时操作同步进行

var fs = require('fs');

function foo() {
    function beginAnotherTask() {
        var file = fs.createReadStream('./QQ_V6.0.1.dmg');
        file.on('data', function(data) {
            console.log(`read file ${data.length} length`);
        });
    }
    process.nextTick(beginAnotherTask);
}
var file = fs.createReadStream('./QQ_V6.0.1.dmg');

file.on('data', (data) => {
    console.log(`read file for process ${data.length}`);
});
foo();