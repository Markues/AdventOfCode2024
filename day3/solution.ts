import { readFileSync } from 'node:fs';

function getInputData(): string {
    const dataString = readFileSync('./day3/input', 'utf8');

    const trimmedString = dataString.trim();

    return trimmedString;
}

function part1(): number {
    const inputStr = getInputData();

    let total = 0;
    const searchRegex = new RegExp(/mul\((?<one>\d{1,3}),(?<two>\d{1,3})\)/, 'g');
    const matches = inputStr.matchAll(searchRegex);

    for (const match of matches) {
        total += parseInt(match.groups?.one!) * parseInt(match.groups?.two!)
    }

    return total;
}

function part2(): number {
    const inputStr = getInputData();

    let total = 0;



    return total;
}

console.log(part1());
console.log(part2());