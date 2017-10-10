// 使用parse方法解析url地址字符串

import http from 'http';
import url from 'url';

const server = http.createServer().listen(1337, 'localhost', () => console.log('开始监听'));

server.on('request', (req, res) => {
    if(req.url !== '/favicon.ico') {
        res.write('<html><head><meta charset="utf-8" /></head>');
        const url_parts = url.parse(req.url);
        switch(url_parts.pathname) {
            case '/':
            case '/index.html':
                res.write('<body>您当前正在访问网站首页。</body>');
                break;
            default:
            res.write(`<body>您正在访问的页面为${url_parts.pathname}。</body></html>`);
        }
    }
    res.end();
});
