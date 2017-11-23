// 利用事件队列解决雪崩问题
// 所谓雪崩问题，就是在搞访问量、大并发量的情况下缓存失效的情景，此时大量的请求同时涌入数据库中，数据库无法同时承受如此大的查询请求进而往前影响到网站的整体的响应速度。
var select = function(callback) {
    db.select('SQL', function(results) {
        callback(results);
    })
};

// 如果站点刚好启动，这时缓存中是不存在数据的，而如果访问量巨大，同一句SQL会被发送到数据库中反复查询，会影响服务的整体性能。一种改进方案是添加一个状态锁，
var status = 'ready';

var select = function(callback) {
    if(status === 'ready') {
        status="pending";
        db.select('SQL', function(results) {
            status = 'ready';
            callback(results);
        })
    }
}
// 但是这种情况下，连续多次调用select() 时，只有第一次调用是生效的，后续的select() 是没有数据服务的，这个时候可以引入事件队列，
var events = require('events');
var proxy = new events.EventEmitter();
var status = 'ready';
var select = function(callback) {
    proxy.once('selected', callback);
    if(status === 'ready') {
        status = 'pending';
        db.select('SQL', function(results) {
            proxy.emit('selected', results);
            status = 'ready';
        });
    }
};