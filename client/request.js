var http = require('http');
let a = 0, b = 0;
for(let i=0; i<10;i++) {
var req = http.request({
    host: 'localhost',
    method: 'GET',
    port:1337,
    headers: {
        'Content-Type': 'application/json'
    },
    path: '/search?foo=bar&abc=xyz&abc=123'
}, (res) => {
    res.on('data', (chunk) => {
        if(chunk.indexOf('39012')>-1) {
            a++
            console.log(a);
        } else {
            b++
            console.log(b);
        }
        console.log(`响应主体: ${chunk}`);
      });
});

req.end();
}