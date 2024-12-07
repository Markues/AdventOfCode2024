"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
function part1() {
    let totalDistance = 0;
    const dataString = (0, node_fs_1.readFileSync)('./day1/input', 'utf8');
    const splitStr = dataString.trim().split(/\s+/g);
    let leftVals = [];
    let rightVals = [];
    splitStr.forEach((value, index) => {
        if (index % 2 === 0) {
            leftVals.push(parseInt(value));
        }
        else {
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
