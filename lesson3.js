//89.123.1.41 и 34.48.240.111

const fs = require('fs');
const es = require('event-stream');

let lineNumber = 0;
const writeStream89 = fs.createWriteStream('89.123.1.41.log', { flags: 'a', encoding: 'utf8' });
const writeStream34 = fs.createWriteStream('34.48.240.111.log', { flags: 'a', encoding: 'utf8' });
const readStream = fs.createReadStream('access.log')
    .pipe(es.split())
    .pipe(es.mapSync(function(line){
            readStream.pause();
            console.log(typeof(line));
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