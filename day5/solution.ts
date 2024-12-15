import { readFileSync } from 'node:fs';

type InputData = {
    rulePairs: number[][];
    pageLists: number[][];
};

function getInputData(): InputData {
    let inputData: InputData = {
        rulePairs: [],
        pageLists: []
    }

    const splitStr = readFileSync('./day5/input', 'utf8').trim().split(/\n\n/g);

    inputData.rulePairs = splitStr[0].split('\n').map((rule) =>
        rule.split('|').map((num) => parseInt(num))
    );

    inputData.pageLists = splitStr[1].split('\n').map((rule) =>
        rule.split(',').map((num) => parseInt(num))
    );

    return inputData;
}

function part1(): number {
    let totalMiddles = 0;
    const inputData = getInputData();

    return totalMiddles;
}

console.log(part1());