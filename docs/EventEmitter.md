
## EventEmitter 类

* **events** 模块只是提供了一个对象： events.EventEmitter。EventEmiter的核心就是事件触发与事件监听功能的封装。

* 你可以通过 ```require("events")```来访问模块.

```javascript
    // 引入events 模块
    var events = require('events');
    // 创建 eventEmitter 对象
    var eventEmitter = new eventsEventEmitter();
```
* EventEmitter 对象如果在实例化时发生错误，会触发**error**事件。当添加新的监听器时， **newListener**事件会触发，当监听器被移除时，**removeListener**事件被触发。
