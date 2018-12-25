
const http = require('http');

const options = {
    method: 'POST',
    hostname: 'localhost',
    port: 3000,
    path: '/api/update?id=12345',
    headers: {
        'User-Agent': 'node_http',
        'Content-Type': 'application/json',
    },
}

// 结果处理
function handler(res) {
    console.log(`> request path: ${res.req.path}`);
    console.log(`> response code:`, res.statusCode);
    console.log(`> response headers:`, res.headers);

    const rawData = [];
    res.on('data', chunk => {
        rawData.push(chunk);
    });
    res.on('end', () => {
        
        const data = JSON.parse(rawData);
        console.log(`> response body:`, data);
    });
}

// 发起请求
const req = http.request(options, handler);
req.on('error', err => {console.log(`> http error: ${err}`)});
req.write(JSON.stringify({title: 'Learn Node.js'}));
req.end();