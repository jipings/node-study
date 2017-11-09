
var connect = require('connect');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');

var app = connect();
app.listen(3000);

function edit(req, res, next) {
    if('GET' != req.method) return next();
    res.setHeader('Content-Type', 'text/html');
    res.write('<form method="post" type="application/x-www-form-urlencoded"><input type="hidden" name="_method" value="put" /><input type="text" name="user" value="Tobi" /><input type="submit" value="Update" /></form>');
    res.end();
};

function update(req, res, next) {
    console.log(req.method, req.body);
    if('POST' != req.method) return next();
    
    res.end(`Updated name to ${req.body.user}`);
};


app.use(morgan('dev'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(edit)
    .use(update);
