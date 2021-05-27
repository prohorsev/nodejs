/*
запуск: node index.js {min} {max}
где
min - нижний предел диапазона чисел
max - верхний предел диапазона чисел
*/
const colors = require("colors/safe");

function run() {
    const min = Number(process.argv[2]);
    const max = Number(process.argv[3]);
    if (validateArguments(min, max)) {
        showResult(findPrimeNumbers(min, max));
    }
}

function validateArguments(min, max) {
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
        console.log(colors.red("Аргумент не является целым числом"));
        return false;
    }
    if (min < 2 || max < 2) {
        console.log(colors.red("Аргумент должен быть больше 1"));
        return false;
    }
    if (min > max) {
        console.log(colors.red("Первый аргумент должен быть меньше второго"));
        return false;
    }
    return true;
}

function findPrimeNumbers(min, max) {
    const numbers = [];
        for (let i = min; i <= max; i++) {
            if (isPrime(i)) {
                numbers.push(i);
            }
        }
    return numbers;
}

function isPrime(num) {
    for(let i = 2; i < num; i++)
        if(num % i === 0) return false;
    return num > 1;
}

function showResult(numbers) {
    if (numbers.length < 1) {
        console.log(colors.red("Нет простых чисел"));
        return false;
    }
    console.log(colors.green(numbers[0]));
    if (numbers[1]) console.log(colors.yellow(numbers[1]));
    if (numbers[2]) console.log(colors.red(numbers[2]));
}

run();