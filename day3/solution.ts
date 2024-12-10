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
    let enabled = true;
    const searchRegex = new RegExp(/(?<mul>mul\((?<one>\d{1,3}),(?<two>\d{1,3})\))|(?<do>do\(\))|(?<dont>don't\(\))/, 'g');
    const matches = inputStr.matchAll(searchRegex);

    for (const match of matches) {
        if(match.groups?.mul) {
            if(enabled) {
                total += parseInt(match.groups?.one!) * parseInt(match.groups?.two!)
            }
        } else if(match.groups?.do) {
            enabled = true;
        } else if(match.groups?.dont) {
            enabled = false;
        }
    }

    return total;
}

console.log(part1());
console.log(part2());