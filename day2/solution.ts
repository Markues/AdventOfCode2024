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
        if(report[0] === report[1]) return;

        const len = report.length;
        const decreasing = report[0] > report[1];

        for(let i = 0; i < len - 1; i++) {
            let diff = report[i] - report[i + 1];
            if((decreasing && diff > 0) || (!decreasing && diff < 0)) {
                if(3 - Math.abs(diff) >= 0) {
                    continue;
                } else {
                    return;
                }
            } else {
                return;
            }
        }
        safeReports++;
    });

    return safeReports;
}

function part2(): number {
    let safeReports = 0;
    const inputData = getInputData();
    const isWithinThree = (val: number): boolean => {
        return 3 - Math.abs(val) >= 0;
    }

    inputData.reports.forEach((report) => {
        const len = report.length;
        let dampener = 1;
        let direction = 0;

        if(report[0] < report[len - 1] || report[1] < report[len - 1]) { // increasing
            direction = -1;
            // Start at the first element and iterate to the next-to-last element
            for(let i = 0; i < len - 1; i++) {
                let diff = report[i] - report[i + 1];
                // If the subsequent value is increasing and it is within 1-3 of the current value
                if(diff <= direction && isWithinThree(diff)) {
                    continue;
                } else {
                    if(dampener === 1) {
                        // If currently checking the final value(s)
                        if(i === len - 2) {
                            continue;
                        }
                        // If checking the first value, check second and third
                        if(i === 0) {
                            let secondDiff = report[i + 1] - report[i + 2];
                            if(secondDiff <= direction && isWithinThree(secondDiff)) {
                                dampener--;
                                i++;
                                continue;
                            }
                        }
                        let skipDiff = report[i] - report[i + 2];
                        // If the next, next value is increasing and is within 1-3 of the current value
                        if(skipDiff <= direction && isWithinThree(skipDiff)) {
                            dampener--;
                            i++;
                            continue;
                        }
                        return;
                    } else {
                        return;
                    }
                }
            }
            // Only increment if all checks have passed
            safeReports++;
        } else if(report[0] > report[len - 1] || report[1] > report[len - 1]) { // decreasing
            direction = 1;
            // Start at the first element and iterate to the next-to-last element
            for(let i = 0; i < len - 1; i++) {
                let diff = report[i] - report[i + 1];
                // If the subsequent value is decreasing and it is within 1-3 of the current value
                if(diff >= direction && isWithinThree(diff)) {
                    continue;
                } else {
                    if(dampener === 1) {
                        // If currently checking the final value(s)
                        if(i === len - 2) {
                            continue;
                        }
                        // If checking the first value, check second and third
                        if(i === 0) {
                            let secondDiff = report[i + 1] - report[i + 2];
                            if(secondDiff >= direction && isWithinThree(secondDiff)) {
                                dampener--;
                                i++;
                                continue;
                            }
                        }
                        let skipDiff = report[i] - report[i + 2];
                        // If the next, next value is decreasing and is within 1-3 of the current value
                        if(skipDiff >= direction && isWithinThree(skipDiff)) {
                            dampener--;
                            i++;
                            continue;
                        } 
                        return;
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