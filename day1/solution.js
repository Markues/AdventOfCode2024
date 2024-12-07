"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const dataString = (0, node_fs_1.readFileSync)('./day1/input', 'utf8');
console.log(dataString.substring(0, 5));
const splitStr = dataString.split(/\s+/g);
console.log(`${splitStr[0]} ${splitStr[1]} ${splitStr[2]}`);
