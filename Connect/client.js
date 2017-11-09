
var exec = require('child_process').exec;

exec('curl http://localhost:3000 -H "Cookie: name=luna"')