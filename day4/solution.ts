import { readFileSync } from 'node:fs';

type InputData = {
    puzzle: string[][];
};

function getInputData(): InputData {
    let inputData: InputData = {
        puzzle: []
    }

    const dataString = readFileSync('./day4/input', 'utf8');

    const splitStr = dataString.trim().split(/\n/g);

    inputData.puzzle = splitStr.map((line) => {
        return line.split('');
    });

    return inputData;
}

function part1(): number {
    let total = 0;
    const inputData = getInputData();
    const numRows = inputData.puzzle.length;
    const numCols = inputData.puzzle[0].length;
    const WORDLENGTH = 4;

    function checkUp(puzzle: string[][], posX: number, posY: number): number {
        if(posY < WORDLENGTH - 1) {
            return 0;
        } else {
            return puzzle[posY - 1][posX] === 'M' && puzzle[posY - 2][posX] === 'A' && puzzle[posY - 3][posX] === 'S' ? 1 : 0;
        }
    }
    
    function checkDown(puzzle: string[][], posX: number, posY: number): number {
        if(puzzle.length - posY < WORDLENGTH) {
            return 0;
        } else {
            return puzzle[posY + 1][posX] === 'M' && puzzle[posY + 2][posX] === 'A' && puzzle[posY + 3][posX] === 'S' ? 1 : 0;
        }
    }
    
    function checkLeft(puzzle: string[][], posX: number, posY: number): number {
        if(posX < WORDLENGTH - 1) {
            return 0;
        } else {
            return puzzle[posY][posX - 1] === 'M' && puzzle[posY][posX - 2] === 'A' && puzzle[posY][posX - 3] === 'S' ? 1 : 0;
        }
    }
    
    function checkRight(puzzle: string[][], posX: number, posY: number): number {
        if(puzzle[posY].length - posX < WORDLENGTH) {
            return 0;
        } else {
            return puzzle[posY][posX + 1] === 'M' && puzzle[posY][posX + 2] === 'A' && puzzle[posY][posX + 3] === 'S' ? 1 : 0;
        }
    }
    
    function checkUpLeft(puzzle: string[][], posX: number, posY: number): number {
        if(posY < WORDLENGTH - 1 || posX < WORDLENGTH - 1) {
            return 0;
        } else {
            return puzzle[posY - 1][posX - 1] === 'M' && puzzle[posY - 2][posX - 2] === 'A' && puzzle[posY - 3][posX - 3] === 'S' ? 1 : 0;
        }
    }
    
    function checkUpRight(puzzle: string[][], posX: number, posY: number): number {
        if(posY < WORDLENGTH - 1 || puzzle[posY].length - posX < WORDLENGTH) {
            return 0;
        } else {
            return puzzle[posY - 1][posX + 1] === 'M' && puzzle[posY - 2][posX + 2] === 'A' && puzzle[posY - 3][posX + 3] === 'S' ? 1 : 0;
        }
    }
    
    function checkDownLeft(puzzle: string[][], posX: number, posY: number): number {
        if(puzzle.length - posY < WORDLENGTH || posX < WORDLENGTH - 1) {
            return 0;
        } else {
            return puzzle[posY + 1][posX - 1] === 'M' && puzzle[posY + 2][posX - 2] === 'A' && puzzle[posY + 3][posX - 3] === 'S' ? 1 : 0;
        }
    }
    
    function checkDownRight(puzzle: string[][], posX: number, posY: number): number {
        if(puzzle.length - posY < WORDLENGTH || puzzle[posY].length - posX < WORDLENGTH) {
            return 0;
        } else {
            return puzzle[posY + 1][posX + 1] === 'M' && puzzle[posY + 2][posX + 2] === 'A' && puzzle[posY + 3][posX + 3] === 'S' ? 1 : 0;
        }
    }

    for(let row = 0; row <= numRows - 1; row++) {
        for(let col = 0; col <= numCols - 1; col++) {
            if(inputData.puzzle[row][col] === 'X') {
                total += checkUp(inputData.puzzle, col, row);
                total += checkDown(inputData.puzzle, col, row);
                total += checkLeft(inputData.puzzle, col, row);
                total += checkRight(inputData.puzzle, col, row);
                total += checkUpLeft(inputData.puzzle, col, row);
                total += checkUpRight(inputData.puzzle, col, row);
                total += checkDownLeft(inputData.puzzle, col, row);
                total += checkDownRight(inputData.puzzle, col, row);
            }   
        }
    }

    return total;
}

function part2(): number {
    let total = 0;
    const inputData = getInputData();
    const numRows = inputData.puzzle.length;
    const numCols = inputData.puzzle[0].length;

    function checkDiagOne(puzzle: string[][], posX: number, posY: number): boolean {
        return (puzzle[posY + 1][posX + 1] === 'M' && puzzle[posY - 1][posX - 1] === 'S')
            || (puzzle[posY + 1][posX + 1] === 'S' && puzzle[posY - 1][posX - 1] === 'M');
    }

    function checkDiagTwo(puzzle: string[][], posX: number, posY: number): boolean {
        return (puzzle[posY + 1][posX - 1] === 'M' && puzzle[posY - 1][posX + 1] === 'S')
            || (puzzle[posY + 1][posX - 1] === 'S' && puzzle[posY - 1][posX + 1] === 'M');
    }

    for(let row = 1; row <= numRows - 2; row++) {
        for(let col = 1; col <= numCols - 2; col++) {
            if(inputData.puzzle[row][col] === 'A') {
                total += checkDiagOne(inputData.puzzle, col, row) && checkDiagTwo(inputData.puzzle, col, row) ? 1 : 0;
            }   
        }
    }

    return total;
}

console.log(part1());
console.log(part2());