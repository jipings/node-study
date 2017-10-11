// 代理服务器制作示例

import http from 'http';
import url from 'url';

const server = http.createServer((sreq, sres) => {
    const url_parts = url.parse(sreq.url);
    const opts = {
        host: 'www.microsoft.com',
        port: 80,
        path: url_parts.pathname,
        headers: sreq.headers,
    };
    const creq = http.get(opts, (cres) => {
        console.log(cres.statusCode);
        sres.writeHead(cres.statusCode, cres.headers);
        cres.pipe(sres);
    });
    sreq.pipe(creq);
}).listen(1337, '127.0.0.1');