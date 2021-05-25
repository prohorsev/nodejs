/*
запуск: node index.js {min} {max}
где
min - нижний предел диапазона чисел
max - верхний предел диапазона чисел
*/
const colors = require("colors/safe");

let min = Number(process.argv[2]);
let max = Number(process.argv[3]);
getPrimeNumbers(min, max);

function getPrimeNumbers(min, max) {
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
        console.log(colors.red("Аргумент не является целым числом"));
        return;
    }
    if (min < 2 || max < 2) {
        console.log(colors.red("Аргумент должен быть больше 1"));
        return;
    }
    if (min > max) {
        console.log(colors.red("Первый аргумент должен быть меньше второго"));
        return;
    }
    let numbers = [];
    nextPrime:
    for (let i = min; i <= max; i++) {
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
