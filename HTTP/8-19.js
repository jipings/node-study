// request 方法请求其他网站数据

import http from 'http';

const options = {
    hostname: 'www.microsoft.com',
    port: 80,
    path: '/',
    method: 'GET'
};

const req = http.request(options, (res) => {
    console.log(`状态码${res.statusCode}`);
    console.log(`响应头${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`响应内容${chunk}`);
    });
});

req.end();