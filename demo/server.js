import http from 'http';
import url from 'url';
import ip from 'ip';

export const start = (route) => {
    const onRequest = (request, response) => {
        const pathname = url.parse(request.url).pathname;
        console.log("Request for" + pathname + "received.");
        
            route(pathname);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    };
    
    http.createServer(onRequest).listen(8888);
    console.log(`Listening on http://${ip.address()}:8888`);
};

