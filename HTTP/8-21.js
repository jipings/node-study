// 使用get方法向其他网站请求数据

import http from 'http';

const options = {
    hostname: 'www.microsoft.com',
    port: 80,
    path: '/',
    method: 'GET'
};

const req = http.get(options, (res) => {
    console.log(`状态码${res.statusCode}`);
    console.log(`响应头${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`响应内容${chunk}`);
    });
});

req.setTimeout(1000, () => {
    req.abort();
});
req.on('error', (e) => {
    if(e.code === 'ECONNRESET') {
        console.log('socket端口超时');
    } else {
        console.log(`在请求过程中发生错误，错误代码为${err.code}`);
    }
});
