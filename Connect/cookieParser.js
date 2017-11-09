
var connect = require('connect');
var cookieParser = require('cookie-parser');

var app = connect()
            .use(cookieParser())
            .use(function(req, res) {
                console.log(req.cookies);
                console.log(req.signedCookies);
                res.setHeader('Set-Cookie', 'foo=bar');
                res.setHeader('Set-Cookie', `tobi=ferret; Expires=${new Date}`);
                res.end();
            }).listen(3000);