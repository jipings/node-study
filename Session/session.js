
const sessions = {};
const key = 'session_id';
const EXPIRES = 20 * 60 * 1000;

const generate = ()  => {
    const session = {};
    session.id = (new Date()).getTime() + Math.random();
    session.cookie = {
        expire: (new Date()).getTime() + EXPIRES
    };
    sessions[session.id] = session;
    return session;
}

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
const serialize = (name, val, opt) => {
    const pairs = [name +'='+encodeURI(val)];
    opt = opt || {};
    if(opt.maxAge) pairs.push('Max-Age='+opt.maxAge);
    if(opt.domain) pairs.push('Domain='+ opt.domain);
    if(opt.path) pairs.push('Path='+opt.path);
    if(opt.expires) pairs.push('Expires='+opt.expires.toUTCString());
    if(opt.httpOnly) pairs.push('HttpOnly');
    if (opt.secure) pairs.push('Secure');
    return pairs.join('; ');
}
const handle = (req, res) => {
    // res.setHeader('Set-Cookie', serialize('isName', '1', {HttpOnly: 1}));
    const writeHead = res.writeHead;
    res.writeHead = function() {
        let cookies = res.getHeader('Set-Cookie');
        const session = serialize('Set-Cookie', req.session.id);
        cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session];
        res.setHeader('Set-Cookie', cookies);
        return writeHead.apply(this, arguments)
    };

    res.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8',});
    if(!req.session.isVisit) {
        res.end('欢迎第一次来到动物园');
    } else {
        res.writeHead(200);
        res.end('动物园再次欢迎你');
    }
}
const http = require('http');

http.createServer((req, res) => {
// 每个请求到来时，检查Cookie中的口令与服务器端的数据，如果过期，就重新生成
    req.cookies = parseCookie(req.headers.cookie);

    const id = req.cookies[key];
    if(!id) {
        req.session = generate();
    } else {
        const session = sessions[id];

        if(session) {
            if(session.cookie.expire > (new Date()).getTime()) {
                // 更新超时时间
                session.cookie.expire = (new Date()).getTime() + EXPIRES;
                req.session = session;
            } 
        } else {
            // 如果session 过期或口令不对，重新生成session
            req.session = generate();
        }
    }
    handle(req, res);

}).listen(1337, '127.0.0.1');

console.log('server is listen on 8000')