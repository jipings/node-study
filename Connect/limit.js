var connect = require('connect');
var bodyParser = require('body-parser');

var app = connect()
            .use(bodyParser.json({limit: '100kb'}))
            .use(function(req, res) {
                console.log(req.body);
                res.end('ok end!');
            });

app.listen(3000);