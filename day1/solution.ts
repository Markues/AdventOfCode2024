import { readFileSync } from 'node:fs'

const dataString = readFileSync('./day1/input', 'utf8');

console.log(dataString.substring(0, 5));

const splitStr = dataString.split(/\s+/g);

console.log(`${splitStr[0]} ${splitStr[1]} ${splitStr[2]}`);
