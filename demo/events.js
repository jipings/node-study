import events from 'events';

const eventEmitter = new events.EventEmitter();

const connectHandler = () => {
    console.log('连接成功');

        // 触发事件
    eventEmitter.emit('data_received');
}

// 绑定 connection 事件处理程序

eventEmitter.on('connection', connectHandler);


eventEmitter.on('data_received', () => {
    console.log('数据接收成功!');
})

eventEmitter.emit('connection');

console.log('程序执行完毕')