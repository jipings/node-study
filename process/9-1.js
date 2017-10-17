
process.stdin.resume();

process.stdin.on('data', function(chunk) {
    process.stdout.write('receive data '+ chunk);
})