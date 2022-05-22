const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const outputT = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw err;
  });
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
  if (err) throw err;
});

//style css
  fs.readdir(path.join(__dirname, 'styles'), 
  { withFileTypes: true },
  (err, files) => {
      files.forEach(file => {
          if (file.isFile() === true && path.parse(path.join(__dirname, 'styles', file.name)).ext === '.css') {
              const readableStream = fs.createReadStream(path.join(__dirname, 'styles', file.name));
              readableStream.pipe(outputT)
          }
      })
  }
)

//copy assets
fs.readdir(path.join(__dirname, 'assets'), 
{ withFileTypes: true },
(err, files) => {
    files.forEach(file => {
        if (file.isFile() === false) {
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', file.name), { recursive: true }, (err) => {
              });
        }
    })
}
)

fs.readdir(path.join(__dirname, 'assets'), 
    { withFileTypes: true },
    (err, files) => {
        files.forEach(fileDir => {
            if (fileDir.isFile() === false) {
                fs.readdir(path.join(__dirname, 'assets', fileDir.name), 
                { withFileTypes: true },
                (err, files) => {
                    files.forEach(file => {
                        if (file.isFile() === true) {
                            const files = path.join(__dirname, 'assets', fileDir.name, file.name)
                            const files_copy = path.join(__dirname, 'project-dist', 'assets', fileDir.name, file.name)
                            fsPromises.copyFile(files, files_copy)
                        }
                    })
                }
            )
            }
        })
    }
)

// html copy
fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
    let template = data
    data.match(/{{(.*?)}}/g).forEach((file) => {
      fs.readFile(path.join(__dirname, 'components', `${file.match(/{{(.*?)}}/)[1]}.html`), 'utf-8', (error, fileFile) => {
        template = template.replace(file, fileFile)
        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template, () => {})
      })
    })
  })
