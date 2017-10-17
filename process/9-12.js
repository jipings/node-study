// SIGINT事件回调函数的使用

process.stdin.resume();
process.on('SIGINT', () => {
    console.log(`接收到SIGINT信号`);
    process.exit();
});
process.stdin.on('data', (data) => console.log(`接收到数据:${data}`));