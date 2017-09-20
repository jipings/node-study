import events from 'events';

const event = new events.EventEmitter;

event.on('some_event', () => {
    console.log('some_event 事件触发');
});

setTimeout(function() {
    event.emit('some_event');
}, 1000);