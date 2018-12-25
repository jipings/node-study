
const http = require('http');
const URL = require('url');

function handler (req, res) {
    // method
    console.log(`> method: ${req.method}`);
    // headers
    console.log(`> headers: ${req.headers}`);
    // url
    console.log(`> url: ${req.url}`)

    const urlObj = URL.parse(req.url, true);
    // pathname
     console.log(`> path: ${urlObj.pathname}`);
    // // url query
     console.log(`> query:`, urlObj.query);

    // receive body
    let body = [];
    req.on('data', chunk => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        body = JSON.parse(body);

        console.log(`> body:`, body);

        // send response
        const data = {id: urlObj.query.id, title: body.title};
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    });
}

const server = http.createServer(handler);
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
})