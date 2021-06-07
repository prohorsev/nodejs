//89.123.1.41 и 34.48.240.111

const fs = require('fs');
const es = require('event-stream');

const path = require("path");
const inquirer = require("inquirer");

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
}

const list = fs.readdirSync(__dirname).filter(isFile);

inquirer
    .prompt([{
        name: "fileName",
        type: "list",
        message: "Choose file:",
        choices: list,
    }])
    .then((answer) => {
        console.log(answer.fileName);
        const filePath = path.join(__dirname, answer.fileName);

        fs.readFile(filePath,'utf8', (err, data) => {
            let lineNumber = 0;
            const writeStream89 = fs.createWriteStream('89.123.1.41.log', { flags: 'a', encoding: 'utf8' });
            const writeStream34 = fs.createWriteStream('34.48.240.111.log', { flags: 'a', encoding: 'utf8' });
            const readStream = fs.createReadStream(filePath)
                .pipe(es.split())
                .pipe(es.mapSync(function(line){
                        readStream.pause();
                        if (line.includes('89.123.1.41')) {
                            writeStream89.write(line);
                            writeStream89.write('\n');
                        }
                        if (line.includes('34.48.240.111')) {
                            writeStream34.write(line);
                            writeStream34.write('\n');
                        }
                        lineNumber += 1;
                        readStream.resume();
                    })
                        .on('error', function (error) {
                            console.log('Error: ', error);
                        })
                        .on('end', function () {
                            console.log('End')
                        })
                );
        });
    });
