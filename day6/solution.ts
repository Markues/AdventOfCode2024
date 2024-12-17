import { readFileSync } from 'node:fs';

type InputData = {
    guardMap: string[][];
};

interface Direction {
    changeX: number;
    changeY: number;
    next: string;
}

interface Directions {
    up: Direction;
    right: Direction;
    down: Direction;
    left: Direction;
}

const directions: Directions = {
    up: {
        changeX: 0,
        changeY: -1,
        next: 'right'
    },
    right: {
        changeX: 1,
        changeY: 0,
        next: 'down'
    },
    down: {
        changeX: 0,
        changeY: 1,
        next: 'left'
    },
    left: {
        changeX: -1,
        changeY: 0,
        next: 'up'
    }
};

function getInputData(): InputData {
    let inputData: InputData = {
        guardMap: []
    }

    const mapRows = readFileSync('./day6/input', 'utf8').trim().split(/\n/g);

    mapRows.forEach((mapRow) => {
        inputData.guardMap.push(mapRow.split(''));
    });

    return inputData;
}

function markTileVisited(inputData: InputData, posX: number, posY: number) {
    inputData.guardMap[posY][posX] = 'X';
}

function part1(): number {
    let inputData = getInputData();
    let currentDirection: Direction = directions.up;
    let currentPosY: number = inputData.guardMap.findIndex((mapLine) => {
        return mapLine.includes('^');
    });
    let currentPosX: number = inputData.guardMap[currentPosY].findIndex((mapTile) => {
        return mapTile === '^';
    });
    let distinctVisits = 1; // start at one becuase starting position counts
    markTileVisited(inputData, currentPosX, currentPosY);
    
    while(currentPosY >= 0 && currentPosY < inputData.guardMap.length && currentPosX >= 0 && currentPosX < inputData.guardMap[0].length) {
        console.log(`${currentPosY}, ${currentPosX}`);
    }

    return distinctVisits;
}

function part2(): number {
    let total = 0;
    const inputData = getInputData();

    return total;
}

console.log(part1());
console.log(part2());