import { readFileSync } from 'node:fs';

type InputData = {
    guardMap: string[][];
};

interface Direction {
    changeX: number;
    changeY: number;
    next: string;
}

const directions: { [k: string]: Direction } = {
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

function markTileVisited(inputData: InputData, distinctVisits: number, posX: number, posY: number) {
    inputData.guardMap[posY][posX] = 'X';
    return distinctVisits + 1;
}

function part1(): number {
    let distinctVisits = 0;
    let inputData = getInputData();
    let currentDirection: Direction = directions.up;
    let currentPosY: number = inputData.guardMap.findIndex((mapLine) => {
        return mapLine.includes('^');
    });
    let currentPosX: number = inputData.guardMap[currentPosY].findIndex((mapTile) => {
        return mapTile === '^';
    });

    const move = () => {
        currentPosY += currentDirection.changeY;
        currentPosX += currentDirection.changeX;
    }

    const isNextOpen = () => {
        return inputData.guardMap[currentPosY + currentDirection.changeY][currentPosX + currentDirection.changeX] !== '#';
    }
     
    while(currentPosY >= 0 && currentPosY < inputData.guardMap.length && currentPosX >= 0 && currentPosX < inputData.guardMap[0].length) {
        if(inputData.guardMap[currentPosY][currentPosX] !== 'X') {
            distinctVisits = markTileVisited(inputData, distinctVisits, currentPosX, currentPosY);
        }

        // Check if the guard is about to move off the map
        if(currentPosY + currentDirection.changeY < 0
            || currentPosY + currentDirection.changeY >= inputData.guardMap.length
            || currentPosX + currentDirection.changeX < 0
            || currentPosX + currentDirection.changeX >= inputData.guardMap[0].length) {
            move();
        }
        // if there is no obstacle in the guard's way - the guard moves
        else if(isNextOpen()) {
            move();
        }
        // otherwise the guard turns, then moves if the space is open
        else {
            currentDirection = directions[currentDirection.next];
            if(isNextOpen()) {
                move();    
            }
        }
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