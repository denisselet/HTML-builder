const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'));
readableStream.on('data', function(chunk) {
    stdout.write(Buffer.from(chunk, 'utf-8').toString())
});
