const fs = require('fs');
const path = require('path');
const { stdout, stdin } = require('process');
const outputT = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), 
    { withFileTypes: true },
    (err, files) => {
        files.forEach(file => {
            if (file.isFile() === true && path.parse(path.join(__dirname, 'styles', file.name)).ext === '.css') {
                const readableStream = fs.createReadStream(path.join(__dirname, 'styles', file.name))
                readableStream.pipe(outputT)
            }
        })
    }
)
