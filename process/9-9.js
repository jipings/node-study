// hrtime方法使用示例

var fs = require('fs');

var time = process.hrtime();
var data = fs.readFileSync('./process.md');

var diff = process.hrtime(time);
console.log(`读取文件操作耗费${diff[0]+diff[1]/1000000}秒`)