// 在简单的程序中使用社区附加模块中的流程控制工具
// https://nodejs.org/dist/v8.9.0
// https://nodejs.org/dist/v8.9.0/node-v8.9.0.tar.gz
var flow =require('nimble')

var exec = require('child_process').exec;

function downloadNodeVersion(version, destination, callback) {
    var url = 'https://nodejs.org/dist/'+version+'/node-'+version+'.tar.gz';
    var filepath = destination+'/'+version+'.tgz';
console.log('curl '+url+' >'+filepath);
    exec('curl '+url+' >'+filepath, callback);
};

flow.series([
    function(callback) {
        flow.parallel([
            function(callback) {
                console.log('Downloading Node v8.9.0...');
                downloadNodeVersion('v8.8.0','/tmp',callback);
            },
            function(callback) {
                console.log('Downloading Node v8.9.0...');
                downloadNodeVersion('v8.9.0','/tmp',callback);
            },
        ], callback)
    },
    function(callback) {
        console.log('Creating archive of downloaded files...');
        exec(
            'tar cvf node_distros.tar /tmp/v8.8.0.tgz /tmp/v8.9.0.tgz',
            function(error, stdout, stderr) {
                console.log('All done!');
                callback();
            }
        );
    }
])