const fs = require('fs/promises');
const currentHead = {x: 0, y: 0};
const currentTail = {x: 0, y: 0};
const visitedPositions = [{x: 0, y: 0}];

const moveTail = () => {
    const xDiff = Math.abs(currentHead.x - currentTail.x);
    const yDiff = Math.abs(currentHead.y - currentTail.y);
    // should i move at all?
    if (xDiff <= 1 && yDiff <= 1) {
        // no
        return;
    }
    // where to?
    if (currentHead.y === currentTail.y) { // they are both on the same rank
        if (currentHead.x > currentTail.x) {
            // to the right
            currentTail.x++;
        } else if (currentHead.x < currentTail.x) {
            // to the left
            currentTail.x--;
        }
    } else if (currentHead.x === currentTail.x) { // they are both on the same file
        if (currentHead.y < currentTail.y) {
            // up
            currentTail.y--;
        } else if (currentHead.y > currentTail.y) {
            // down
            currentTail.y++;
        }
    } else {
        if (xDiff === 1) {
            currentTail.x = currentHead.x;
            if (currentHead.y < currentTail.y) { // head is above tail so to get to the right position we add 1 to head.y
                currentTail.y = currentHead.y+1;
            } else {
                currentTail.y = currentHead.y-1; // head is under tail so to get to the right position we subtract 1 form head.y
            }
        } else if (yDiff === 1) {
            currentTail.y = currentHead.y;
            if (currentHead.x > currentTail.x) { 
                currentTail.x = currentHead.x-1;
            } else {
                currentTail.x = currentHead.x+1;
            }
        }
    }
    visitedPositions.push(JSON.parse(JSON.stringify(currentTail)));     
}

const moveHead = (direction) => {
    switch (direction) {
        case 'R':
            currentHead.x++;
            break;
        case 'L':
            currentHead.x--;
            break;
        case 'U':
            currentHead.y--;
            break;
        case 'D':
            currentHead.y++;
            break;
    }
    moveTail();
}

const main = async () => {
    const lines = await (await fs.readFile('input.txt')).toString().split("\n").filter(line => line.trim().length > 0);
    for (const line of lines) {
        input = line.split(" ");
        const direction = input[0];
        const amount = parseInt(input[1]);
        for (let i = 0; i < amount; i++) {
            moveHead(direction);
        }
    }
    const array = visitedPositions.map(p => `${p.y}, ${p.x}`);
    const filteredDuplicates = Array.from(new Set(array));
    console.log(filteredDuplicates.length);
}
main();