// exit事件回调函数的使用示例

process.on('exit', () => console.log('node.js进程被退出'))

process.exit();