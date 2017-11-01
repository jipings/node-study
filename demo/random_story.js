// 串行化流程控制

var fs = require('fs');
var request = require('request');
var htmlparser =  require('htmlparser');
var configFilename = './rss_feeds.txt';

function checkForRSSFile() {
    fs.exists(configFilename, function(exists) { // 1, 确保包含rss预定源url列表文件存在
        if(!exists) {
            return next(new Error('Missing RSS file:' + configFilename));
        }
        next(null, configFilename);
    })
};

function readRSSFile (configFilename) { // 2, 读取并解析包含预订源url的文件
    fs.readFile(configFilename, function(err, feedList) {
        if(err) {return next(err)};
        // 将预订源url列表转换成字符串，然后分割成一个数组
        feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split('\n');

        var random = Math.floor(Math.random()*feedList.length);
        next(null, feedList[random]);
    })
}

function downloadRSSFeed (feedUrl) { //3, 向选定的预订源发送http请求以获取数据
    console.log(feedUrl,'asd')
    request({uri: feedUrl}, function(err, res, body) {
        if(err) {return next(err)};
        console.log(res.statusCode);
        if(res.statusCode !== 200) {
            return next(new Error('Abnormal response status code'))
        }
        next(null, body);
    })
}

function parseRSSFeed(rss) { // 4, 将预订源数据解析到一个条目数组中
   //  console.log(rss);
    var handler = new htmlparser.RssHandler();
    var parser = new htmlparser.Parser(handler);

    parser.parseComplete(rss);
    console.log(handler) // 遍历节点
    if(!handler.dom.items.length) {
        return next(new Error('No RSS items found'));
    }
    var item = handler.dom.items.shift();

    console.log(item.title, item.link);
}

var tasks = [ // 把所有要做的任务按执行顺序添加到一个数组中
    checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed,
]

function next(err, result) {
    if(err) throw err; // 任务出错，抛出异常

    var currentTask = tasks.shift(); // 从任务数组中取出下一个任务

    if(currentTask) {
        currentTask(result);
    }
}

next();

