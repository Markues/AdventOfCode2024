import { readFileSync } from 'node:fs';

type InputData = {
    reports: Array<Array<number>>;
};

function getInputArrays(): InputData {
    let inputData: InputData = {
        reports: []
    }

    const dataString = readFileSync('./day2/input', 'utf8');

    const splitStr = dataString.trim().split(/\n/g);

    splitStr.forEach((value) => {
        inputData.reports.push(value.split(/\s+/g).map((val) => {
            return parseInt(val);
        }));
    });

    return inputData;
}

console.log(getInputArrays().reports[1]);