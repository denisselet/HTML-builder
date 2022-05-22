
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) throw err;
  });

fs.readdir(path.join(__dirname, 'files'), 
    { withFileTypes: true },
    (err, files) => {
        files.forEach(file => {
            if (file.isFile() === true) {
                const files = path.join(__dirname, 'files', file.name)
                const files_copy = path.join(__dirname, 'files-copy', file.name)
                fsPromises.copyFile(files, files_copy)
            }
        })
    }
)

  fs.readdir(path.join(__dirname, 'files-copy'), 
  { withFileTypes: true },
  (err, files) => {
      files.forEach(file => {
          if (file.isFile() === true) {
            fs.access(path.join(__dirname, 'files', file.name), fs.constants.F_OK, (err) => {
                if (err) {
                    fs.unlink(path.join(__dirname, 'files-copy', file.name), (err) => {});
                }
              });
          }
      })
  }
)
