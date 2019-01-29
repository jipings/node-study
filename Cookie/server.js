const parseCookie = (cookie) => {
    console.log(cookie, 'cookie');
    const cookies = {};
    if(!cookie) {
        return cookies
    };
    const list = cookie.split(';');
    list.forEach((t, i) => {
        const pair = t.split('=');
        cookies[pair[0].trim()] = pair[1];
    });

    return cookies;
}
const handle = (req, res) => {
    res.setHeader('Set-Cookie', serialize('isVisit', '1'));
    res.writeHead(200,{'Content-Type': 'text/plain'});
    if(!req.cookies.isVisit) {
        res.end('first entry')
    } else {
        res.end('not first entry')
    }
}
const serialize = (name, val, opt) => {
    const pairs = [name +'='+encode(val)];
    opt = opt || {};
    if(opt.maxAge) pairs.push('Max-Age='+opt.maxAge);
    if(opt.domain) pairs.push('Domain='+ opt.domain);
    if(opt.path) pairs.push('Path='+opt.path);
    if(opt.expires) pairs.push('Expires='+opt.expires.toUTCString());
    if(opt.httpOnly) pairs.push('HttpOnly');
    if (opt.secure) pairs.push('Secure');
    return pairs.join('; ');
}
const http = require('http');
http.createServer((req, res) => {
    
    req.cookies = parseCookie(req.headers.cookie);
    handle(req, res);
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.end('Hello World \n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

