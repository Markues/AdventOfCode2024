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
        const len = report.length;
        if(report[0] < report[1]) { // increasing
            // Start at the first element and iterate to the next-to-last element
            for(let i = 0; i < len - 1; i++) {
                if(report[i] < report[i + 1] && report[i + 1] - report[i] > 0 && report[i + 1] - report[i] <= 3) {
                    continue;
                } else {
                    return;
                }
            }
            safeReports++;
        } else if(report[0] > report[1]) { // decreasing
            // Start at the first element and iterate to the next-to-last element
            for(let i = 0; i < len - 1; i++) {
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

function part2(): number {
    let safeReports = 0;
    const inputData = getInputData();

    inputData.reports.forEach((report) => {
        const len = report.length;
        let dampener = 1;
        if(report[0] < report[1]) { // increasing
            // Start at the first element and iterate to the next-to-last element
            for(let i = 0; i < len - 1; i++) {
                // If the subsequent value is increasing and it is within 1-3 of the current value
                if(report[i] < report[i + 1] && report[i + 1] - report[i] > 0 && report[i + 1] - report[i] <= 3) {
                    continue;
                } else {
                    if(dampener === 1) {
                        // If currently checking the final value(s)
                        if(i === len - 2) {
                            continue;
                        }
                        // If the next, next value is increasing and is within 1-3 of the current value
                        else if(report[i] < report[i + 2] && report[i + 2] - report[i] > 0 && report[i + 2] - report[i] <= 3) {
                            dampener--;
                            i++;
                            continue;
                        }
                    } else {
                        return;
                    }
                }
            }
            // Only increment if all checks have passed
            safeReports++;
        } else if(report[0] > report[1]) { // decreasing
            // Start at the first element and iterate to the next-to-last element
            for(let i = 0; i < len - 1; i++) {
                // If the subsequent value is decreasing and it is within 1-3 of the current value
                if(report[i] > report[i + 1] && report[i] - report[i + 1] > 0 && report[i] - report[i + 1] <= 3) {
                    continue;
                } else {
                    if(dampener === 1) {
                        // If currently checking the final value(s)
                        if(i === len - 2) {
                            continue;
                        } // If the next, next value is decreasing and is within 1-3 of the current value
                        else if(report[i] > report[i + 2] && report[i] - report[i + 2] > 0 && report[i] - report[i + 2] <= 3) {
                            dampener--;
                            i++;
                            continue;
                        }
                    } else {
                        return;
                    }
                }
            }
            // Only increment if all checks have passed
            safeReports++;
        } else { // unsafe report
            return;
        }
    });

    return safeReports;
}

console.log(part1());
console.log(part2());