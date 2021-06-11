//89.123.1.41 и 34.48.240.111

const fs = require('fs');
const path = require("path");
const inquirer = require("inquirer");

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
}

let list = fs.readdirSync(__dirname);

const fileManager = (list) => {
    inquirer
        .prompt([{
            name: "fileName",
            type: "list",
            message: "Choose file:",
            choices: list,
        }])
        .then((answer) => {
            const filePath = path.join(__dirname, answer.fileName);
            if (isFile(filePath)) {
                console.log(answer.fileName);
                fs.readFile(filePath,'utf8', (err, data) => {
                    console.log("\n\033[90m" + data + "\033[39m");
                });
            } else {
                fs.opendir(filePath, { encoding: "utf8", bufferSize: 64 }, (err, data) => {
                    __dirname = filePath;
                    list = fs.readdirSync(filePath);
                    fileManager(list);
                });
            }
        });
}
fileManager(list);
