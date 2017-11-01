// 在一个简单的程序中实现并行化流程控制

var fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordCounts = {};
var filesDir = './text';

function checkIfComplete() { // 当所有任务全部完成后，列出文件中用到的每隔单词以及用了多少次
    completedTasks++;
    if(completedTasks == tasks.length) {
        for(var index in wordCounts) {
            console.log(index+': '+wordCounts[index]);
        }
    }
}

function countWordsInText(text) {
    var words = text.toString().toLowerCase().split(/\W+/).sort();
    for(var index in words) {
        var word = words[index];
        if(word) {
            wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1;
        }
    }
}

fs.readdir(filesDir, function(err, files) {
    console.log(files)
    if(err) throw err;
    
    for(var index in files) {
        var task = (function(file){
            return function() {
                fs.readFile(file, function(err, text) {
                    if(err) throw err;
                    countWordsInText(text);
                    checkIfComplete();
                });
            }
        })(filesDir+'/'+files[index]);
        tasks.push(task);
    }
    for(var task in tasks) {
        tasks[task]();
    }
})