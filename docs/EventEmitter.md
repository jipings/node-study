
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

## event常用方法

| 方法        | 描述        |
| ---------- |:-----------|
| addListener(event, listener) | 为制定事件添加一个监听器到监听器数组的尾部 |
| on(event, listener) | 为制定事件注册一个监听器，接受一个字符串event和一个回调函数 |
| once(event, listener) | 为指定事件注册一个单次监听器，即监听器最多只会触发一次，触发后立刻解除该监听器 |
| removeListener(event, listener) | 移除指定事件的某个监听器，监听器 必须是该事件已经注册过的监听器。 |
| removeAllListeners([event]) | 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。 |
| setMaxListeners(n) | 默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。|
| listeners(event) | 返回指定事件的监听器数组。|
| emit(event, [arg1], [arg2], [...]) | 按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。 |

