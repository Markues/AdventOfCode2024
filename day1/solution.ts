import { readFileSync } from 'node:fs'

function part1(): number {
    let totalDistance = 0;

    const dataString = readFileSync('./day1/input', 'utf8');

    const splitStr = dataString.trim().split(/\s+/g);

    let leftVals: Array<number> = [];
    let rightVals: Array<number> = [];

    splitStr.forEach((value, index) => {
        if (index % 2 === 0) {
            leftVals.push(parseInt(value));
        } else {
            rightVals.push(parseInt(value));
        }
    });

    leftVals.sort((val1, val2) => {
        return val1 - val2;
    });

    rightVals.sort((val1, val2) => {
        return val1 - val2;
    });

    leftVals.forEach((leftVal, index) => {
        totalDistance += Math.abs(leftVal - rightVals[index]);
    });

    return totalDistance;
}

function part2() {

}

console.log(part1());