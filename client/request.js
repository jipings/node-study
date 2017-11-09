var http = require('http');

var req = http.request({
    host: 'localhost',
    method: 'GET',
    port:3000,
    headers: {
        'Content-Type': 'application/json'
    },
    path: '/search?foo=bar&abc=xyz&abc=123'
});

req.end();