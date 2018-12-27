
const express = require('express');
const app = new express();

app.use((req,res, next) => {
    res.set('Content-Type','text/plain');
    res.set('x-start', Date.now());
    next();
});

app.use((req,res,next) => {
    res.send('hello');
    // send 后就不应再执行 next
    next();
});

app.use((req,res,next) => {
    setTimeout(next,5000);
});

app.use((req,res,next) => {
    res.set('x-end', Date.now());
    next();
});

app.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000/');
})