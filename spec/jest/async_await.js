
// async 异步编程

// 1.流程控制
// 函数有：
// series
// waterfall
// parallel
// parallelLimit
// …

// series函数 串行执行 它的作用就是按照顺序一次执行。
const async = require('async');

async.series({
    one: function(callback) {
        // console.log(callback+'');
        callback(null, 1);
    },
    two: function(callback) {
        callback(null, 2)
    }
}, function(err, result) {
    console.log(result);
});

// series函数的第一个参数可以是一个数组也可以是一个JSON对象，
// 参数类型不同，影响的是返回数据的格式。

// waterfall 函数 瀑布流
// waterfall和series函数有很多相似之处，都是按照顺序执行。
// 不同之处是waterfall每个函数产生的值，都将传给下一个函数，而series则没有这个功能，示例如下：

async.waterfall([
    function(callback) {
        callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback) {
        
        // console.log(arg1, arg2);
      // arg1 now equals 'one' and arg2 now equals 'two'
      callback(new Error(), 'three');
    },
    function(arg1, callback) {
        // console.log(arg1, callback+'');
        callback(null, 'four');
    },
    function(arg1, callback) {
        // console.log(arg1);
        // arg1 now equals 'three'
        callback(null, 'done');
    }
], function(err, result) {
    // result now equals 'done'
    console.log(result);
});

// 另外需要注意的是 waterfall 的 tasks 参数只能是数组类型。
// 当中途有函数出错，其err直接传给最终callback，结果被丢弃，后面的函数不再执行。

// parallel(tasks, [callback])

// parallel函数是并行执行多个函数，每个函数都是立即执行，不需要等待其它函数先执行。
// 传给最终callback的数组中的数据按照tasks中声明的顺序，而不是执行完成的顺序，示例如下：

async.parallel([
    function(callback) {
        callback(null, 'one');
    },
    function(callback) {
        callback(null, 'two');
    }
], function(err, results) {
    console.log(results);
});

// tasks参数可以是一个数组或是json对象，和series函数一样，
// tasks参数类型不同，返回的results格式会不一样。

// parallelLimit(tasks, limit, [callback])

// parallelLimit函数和parallel类似，但是它多了一个参数limit。
// limit参数限制任务只能同时并发一定数量，而不是无限制并发，示例如下：

async.parallelLimit([
	function(callback){
		callback(null, 'one');
	},
	function(callback){
		callback(null, 'two');
    }, 
    function(callback){
		callback(null, 'three');
	}
],
2,
function(err, results){
	console.log(results);
});

//  async function 函数声明将定义一个异步函数，返回 AsyncFunction 对象。
// 一个 AsyncFunction 对象，表示一个异步函数。

async function name(number) {
    return number;
}

name(2).then((num) =>  console.log(num));

// await

// await  操作符用于等待一个Promise 对象。它只能在异步函数 async function 中使用。

// 一个 Promise 对象或者任何要等待的值。
// 返回 Promise 对象的处理结果。如果等待的不是 Promise 对象，则返回该值本身。

// await 表达式会暂停当前 async function 的执行，等待 Promise 处理完成。若 Promise 正常处理(fulfilled)，其处理结果作为 await 表达式的值，继续执行 async function。

// 若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。

// 另外，如果 await 操作符后的表达式的值不是一个 Promise，那么该值将被转换为一个已正常处理的 Promise。

// 如果一个 Promise 被传递给一个 await 操作符，await 将等待 Promise 正常处理完成并返回其处理结果。
const await = require('await');

function resolveAfter2Seconds(x) {
    return new Promise( resolve => {
        setTimeout(() => {
            resolve(x);
        }, 2000);
    });
};

async function f1(params) {
    var x = await resolveAfter2Seconds(10);
    console.log(x);
};

f1();

// 如果该值不是一个 Promise，await 会把该值转换为已正常处理的Promise，然后等待其处理结果。

async function f2() {
    var y = await 20;
    console.log(y);
};

f2();

// 如果 Promise 处理异常，则异常值被抛出。

async function f3() {
    try {
        var z = await Promise.reject(30);
    } catch (e) {
        console.log(e);
    };
}

f3();