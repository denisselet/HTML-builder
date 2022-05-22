const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'),    
    { withFileTypes: true },
    (err, files) => {
        files.forEach(file => {
            if (file.isFile() === true) {
                fs.stat(path.join(__dirname, 'secret-folder', file.name) , (err, stats) => {
                    let name = path.parse(path.join(__dirname, 'secret-folder', file.name)).name
                    let ext = path.parse(path.join(__dirname, 'secret-folder', file.name)).ext
                    let size = stats.size
                    console.log(`${name} - ${ext} - ${size}`)
                })
            }
        })
    }
)

