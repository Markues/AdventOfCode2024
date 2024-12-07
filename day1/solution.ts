import { readFileSync } from 'node:fs'

const dataString = readFileSync('./day1/input', 'utf8');

const splitStr = dataString.split(/\s+/g);

let leftVals: Array<number> = [];
let rightVals: Array<number> = [];

splitStr.forEach((value, index) => {
    if(index % 2 === 0) {
        leftVals.push(parseInt(value));
    } else {
        rightVals.push(parseInt(value));
    }
});

console.log(leftVals[1]);
console.log(rightVals[1]);