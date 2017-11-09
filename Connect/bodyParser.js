
var connect = require('connect');
var bodyParser = require('body-parser');


var connectMultiparty = require('connect-multiparty');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// parse some custom thing into a Buffer
var raw = bodyParser.raw({ type: '*/*' });

var app = connect()
            .use(connectMultiparty())
            .use(function(req, res) {
                console.log(req.body, req.files);
                res.end('new user: '+ req.body.username);
            }).listen(3000);