"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const dataString = (0, node_fs_1.readFileSync)('./day1/input', 'utf8');
const splitStr = dataString.split(/\s+/g);
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
console.log(leftVals[0]);
console.log(rightVals[0]);
