import { readFileSync } from 'node:fs'

type InputData = {
    leftVals: Array<number>;
    rightVals: Array<number>;
    rightCounts: { [key: string]: number };
};

function getInputArrays(): InputData {
    let inputData: InputData = {
        leftVals: [],
        rightVals: [],
        rightCounts: {}
    }

    const dataString = readFileSync('./day1/input', 'utf8');

    const splitStr = dataString.trim().split(/\s+/g);

    splitStr.forEach((value, index) => {
        if (index % 2 === 0) {
            inputData.leftVals.push(parseInt(value));
        } else {
            inputData.rightVals.push(parseInt(value));

            if(Object.hasOwn(inputData.rightCounts, value)) {
                inputData.rightCounts[value]++;
            } else {
                inputData.rightCounts[value] = 1;
            }
        }
    });
    
    return inputData;
}

function part1(): number {
    let totalDistance = 0;
    let inputData = getInputArrays();

    inputData.leftVals.sort((val1, val2) => {
        return val1 - val2;
    });

    inputData.rightVals.sort((val1, val2) => {
        return val1 - val2;
    });

    inputData.leftVals.forEach((leftVal, index) => {
        totalDistance += Math.abs(leftVal - inputData.rightVals[index]);
    });

    return totalDistance;
}

function part2(): number {
    let similarityScore = 0;
    let inputData = getInputArrays();

    console.log(inputData.rightCounts);

    return similarityScore;
}

console.log(part1());
console.log(part2());