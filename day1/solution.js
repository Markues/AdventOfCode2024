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
console.log(leftVals[1]);
console.log(rightVals[1]);
