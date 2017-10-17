## node.js 中的进程对象具有的属性及属性值

* execPath：属性值为用来运行应用程序的可执行文件的绝对路径

* version：node版本号

* versions： node以及其各依赖的版本号。

* platform：属性值为当前运行node的平台 例如： darwin、freebsd、linux、sunos、win32

* stdin：属性值为一个可用于读入标准流的对象，在默认情况下，标准输入流处于暂停状态，必须使用`process.stdin.resume()`方法恢复读取标准输入流数据。

* stdout： 属性值为一个可用于写入标准输出流的对象。

* stderr：属性值为一个可用于写入标准错误输出流的对象。

* argv：属性职位一个数组，其中包含了运用node应用程序时的所有命令参数。

* env: 属性值为一个对象，其中包含了运行node操作系统环境信息

* config: 属性为一个对象

* pid：属性值为运行当前node的进程的PID

* arch：运行node的处理器架构


## 进程对象的方法和事件

* memoryUsage方法

memoryUsage方法用于获取运行node应用程序使用的内存量
`process.memoryUsage()`
返回一个object，
ress：整数，消耗的内存
heapTotal: V8所分配的内存量
headpUsed: V8内存消耗量

* nextTick方法

nextTick 方法用于将一个函数推迟到代码中下一个同步方法执行完毕，或者异步方法的事件回调函数开始执行时调用
`process.nextTick(callback)`
在nextTick方法中，使用一个参数，参数值为被推迟的函数。
