
var connect = require('connect');
var app = connect();

app.listen(3000);

app.use(setup(':method :url'))
    .use('/admin', restrict)
    .use('/admin', admin)
    .use(hello);

function logger(req, res, next) {
    console.log(req.method, req.url);
    next();
};

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
}

function restrict(req, res, next) {
    console.log(req.headers)
    var authorization = req.headers.authorization;
    if(!authorization) {
        return next(new Error('Unauthorized'));
    }
    console.log(authorization, 'authorization');
    var parts = authorization.split(' ');
    var scheme = parts[0];
    var auth = new Buffer(parts[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    authenticateWithDatabase(user, pass, function(err) {
        if(err) return next(err);
        next(); 
    });
}

function admin(req, res, next) {
    switch (req.url) {
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['tobi', 'loki', 'jane']));
            break;
    }
}

function setup(format) {
    var regexp = /:(\w+)/g;

    return function(req, res, next) {
        var str = format.replace(regexp, function(match, property) {
            return req[property];
        });
        console.log(str);

        next();
    }
}