/*
запуск: node index.js {number}
где number - верхний предел диапазона чисел
*/
const colors = require("colors/safe");

let range = Number(process.argv[2]);
getPrimeNumbers(range);

function getPrimeNumbers(range) {
    if (!Number.isInteger(range)) {
        console.log(colors.red("Аргумент не является числом"));
        return;
    }
    let numbers = [];
    nextPrime:
    for (let i = 2; i <= range; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                continue nextPrime;
            }
        }
       numbers.push(i);
    }
    if (numbers.length < 1) {
        console.log(colors.red("Нет простых чисел"));
        return;
    }
    console.log(colors.green(numbers[0]));
    if (numbers[1]) console.log(colors.yellow(numbers[1]));
    if (numbers[2]) console.log(colors.red(numbers[2]));
}
