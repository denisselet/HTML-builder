const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = require('node:process');
const readline = require('node:readline');

output.write('Hello, please enter text\n');
const outputT = fs.createWriteStream(path.join(__dirname, 'text.txt'));

const rl = readline.createInterface({ input, output });

rl.on('line', (inputLine) => { 
    if(inputLine === 'exit') {
        output.write('Thank you, bay\n');
        rl.close()
    }
});
input.pipe(outputT);

rl.on('SIGINT', () => {
    output.write('Thank you, bay\n');
    process.exit();
});




