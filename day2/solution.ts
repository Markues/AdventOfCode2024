import { readFileSync } from 'node:fs';

type InputData = {
    reports: Array<Array<number>>;
};

function getInputData(): InputData {
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

function part1(): number {
    let safeReports = 0;
    const inputData = getInputData();

    inputData.reports.forEach((report) => {
        if(report[0] < report[1]) { // increasing
            // Start at the first element and iterate to the next-to-last element
            for(let i = 0; i < report.length - 1; i++) {
                if(report[i] < report[i + 1] && report[i + 1] - report[i] > 0 && report[i + 1] - report[i] <= 3) {
                    continue;
                } else {
                    return;
                }
            }
            safeReports++;
        } else if(report[0] > report[1]) { // decreasing
            // Start at the first element and iterate to the next-to-last element
            for(let i = 0; i < report.length - 1; i++) {
                if(report[i] > report[i + 1] && report[i] - report[i + 1] > 0 && report[i] - report[i + 1] <= 3) {
                    continue;
                } else {
                    return;
                }
            }
            safeReports++;
        } else { // unsafe report
            return;
        }
    });

    return safeReports;
}

console.log(part1());