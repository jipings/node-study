
var connect = require('connect');
var querystring = require('querystring');

var app = connect()
            .use(function (req, res, next) {
                console.log(req.query, querystring.parse(req.query));
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(req.query));
            });

app.listen(3000);

var a = {images: ['foo.png', 'bar.png']};
console.log(querystring.stringify(a));