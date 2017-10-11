// 用于发送数据的http客户端

import http from 'http';

const options = {
    hostname: 'localhost',
    port: 1337,
    path: '/',
    method: 'POST',
};
const req = http.request(options);

req.write('你好');
req.end('再见');