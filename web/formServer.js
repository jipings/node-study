
var http = require('http');
var qs = require('querystring');
var formidable = require('formidable');
var items = [];

var server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    if('/' == req.url) {
        switch (req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                upload(req, res);
                break;
            default:
                badRequest(res);
        } 
    } else {
        notFound(res);
    }
});

server.listen(3000, () => {console.log('🌍 => formServer listen on localhost:3000')});

function show(res) {
    // console.log(items)
    var html = `<!DOCTYPE html><html>
        <head><title>Todo List</title></head>
        <body>
        <h1>Todo List</h1>
        <ul>
        ${
            items.map((item) => {
                return `<li>${item}</li>`
            }).join('')
        }
        </ul>
        <form method="post" action="/" enctype="multipart/form-data">
            <p><input type="text" name="item" /></p>
            <p><input type="file" name="file" /></p>
            <p><input type="submit" value="Upload" /></p>
        </form>
        </body>
    </html>`;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
}

function badRequest(res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Request');
}

function add(req, res) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {body += chunk});
    req.on('end', () => {
        var obj = qs.parse(body);
        items.push(obj.item);
        show(res);
    })
}

function upload(req, res) {
    if(!isFormData(req)) {
        res.statusCode = 400;
        res.end('Bad Request: expecting multipart/form-data');
        return;
    }

    var form = new formidable.IncomingForm();

    // form.on('filed', function(field, value) {
    //    console.log(field, value);
    // });

    // form.on('file', function(name, file) {
    //      console.log(name, file);
    // });

    // form.on('end', function() {
    //     res.end('upload complete!');
    // });

    form.parse(req, function(err, fields, files) {
        console.log(err);
        console.log(fields, files);
        res.end('upload complete!');
    });
    form.on('progress', function(bytesReceived, bytesExpected) {
        var percent = Math.floor(bytesReceived/bytesExpected *100);
        console.log(percent);
    });
}

function isFormData(req) {
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}