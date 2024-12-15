import { readFileSync } from 'node:fs';

type InputData = {
    rulePairs: number[][];
    pageLists: number[][];
    uniqueVals: number[];
    // 'T' means the y-axis value comes before the x-axis value
    // 'F' means the y-axis value comes after the x-axis value
    // '_' means invalid or unset
    truthTable: ('T' | 'F' | '_')[][];
};

function getInputData(): InputData {
    let inputData: InputData = {
        rulePairs: [],
        pageLists: [],
        uniqueVals: [],
        truthTable: []
    }

    const splitStr = readFileSync('./day5/input', 'utf8').trim().split(/\n\n/g);

    inputData.rulePairs = splitStr[0].split('\n').map((rule) => {
        return rule.split('|').map((num) => {
            return parseInt(num);
        });
    });

    inputData.pageLists = splitStr[1].split('\n').map((rule) => {
        return rule.split(',').map((num) => { 
            return parseInt(num)
        });
    });

    // figure out all the unique values we're working with (it's not all of 11 -> 99)
    inputData.uniqueVals = [...new Set(inputData.rulePairs.flat())].sort();

    inputData.uniqueVals.forEach(() => {
        inputData.truthTable.push(new Array(inputData.uniqueVals.length).fill('_'));
    });

    inputData.rulePairs.forEach(([first, second]) => {
        const xVal = inputData.uniqueVals.indexOf(first);
        const yVal = inputData.uniqueVals.indexOf(second);
        inputData.truthTable[xVal][yVal] = 'T';
        inputData.truthTable[yVal][xVal] = 'F';
    });

    return inputData;
}

function checkTruthTable(inputData: InputData, val1: number, val2: number): boolean {
    return inputData.truthTable[inputData.uniqueVals.indexOf(val1)][inputData.uniqueVals.indexOf(val2)] === 'T';
}

function checkPageList(inputData: InputData, pageList: number[]): boolean {
    return pageList.every((value, index) => {
        if (index === 0) { // assume the first value is fine
            return true;
        }
        else { // check the rest
            return checkTruthTable(inputData, pageList[index - 1], value);
        }
    });
}

function getMiddleVal(pageList: number[]): number {
    return pageList[Math.floor(pageList.length / 2)];
}

function part1(): number {
    const inputData = getInputData();
    
    const totalMiddles = inputData.pageLists
        .filter((pageList) => { // only consider lists which pass
            return checkPageList(inputData, pageList);
        })
        .map((pageList) => {
            return getMiddleVal(pageList);
        })
        .reduce((val1, val2) => {
            return val1 + val2
        }, 0);

    return totalMiddles;
}

function part2(): number {
    const inputData = getInputData();
    
    const totalFixedMiddles = inputData.pageLists
        .filter((pageList) => { // only consider lists which do not pass
            return !checkPageList(inputData, pageList);
        })
        .map((badPageList) => { // sort the bad lists using our truth table
            return badPageList.toSorted((val1, val2) => {
                return checkTruthTable(inputData, val1, val2) ? -1 : 1;
            });
        })
        .map((pageList) => {
            return getMiddleVal(pageList);
        })
        .reduce((val1, val2) => {
            return val1 + val2
        }, 0);

    return totalFixedMiddles;
}

console.log(part1());
console.log(part2());