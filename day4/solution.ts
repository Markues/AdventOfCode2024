import { readFileSync } from 'node:fs';

type InputData = {
    puzzle: Array<Array<string>>;
};

function getInputData(): InputData {
    let inputData: InputData = {
        puzzle: []
    }

    const dataString = readFileSync('./day4/input', 'utf8');

    const splitStr = dataString.trim().split(/\n/g);

    inputData.puzzle = splitStr.map((line) => {
        return line.split('');
    });

    return inputData;
}

function part1(): number {
    let total = 0;


    return total;
}

function part2(): number {
    let total = 0;


    return total;
}

console.log(part1());
console.log(part2());