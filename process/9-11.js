// uncaughtException 事件回调函数使用
process.on('uncaughtException', (err) => console.log(`捕获到一个未被处理的错误${err}`));

nonexistentFunc();