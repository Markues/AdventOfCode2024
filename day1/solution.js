"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
function getInputArrays() {
    let inputData = {
        leftVals: [],
        rightVals: []
    };
    const dataString = (0, node_fs_1.readFileSync)('./day1/input', 'utf8');
    const splitStr = dataString.trim().split(/\s+/g);
    splitStr.forEach((value, index) => {
        if (index % 2 === 0) {
            inputData.leftVals.push(parseInt(value));
        }
        else {
            inputData.rightVals.push(parseInt(value));
        }
    });
    return inputData;
}
function part1() {
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
function part2() {
    let inputData = getInputArrays();
}
console.log(part1());
