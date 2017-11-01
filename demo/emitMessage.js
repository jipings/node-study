
// 用事件发射器实现简单的发布、预定系统

var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function (id, client) { // 添加join事件的监听器，保存用户的client 对象，以便程序可以将数据发送给用户。
    this.clients[id] = client;
    this.subscriptions[id] = (senderId, message) => {
        if(id != senderId) {
            this.clients[id].write(message);
        }
    }
    this.on('broadcast', this.subscriptions[id]);
});

var server = net.createServer((client) => {
    var id = client.remoteAddress + ':' + client.remotePort;
    channel.emit('join', id, client);
    client.on('data', function(data) {
        console.log(data.toString());
        data = data.toString();
        channel.emit('broadcast', id, data);
    })
})

server.listen(8888);