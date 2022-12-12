const fs = require('fs/promises');
const pieces = [];
for (let i = 0; i < 10; i++) {
    pieces[i] = {x: 0, y: 0};
}

const visitedPositions = [{x: 0, y: 0}];

const moveTail = (head, tail, isFinal, i) => {
    const xDiff = Math.abs(head.x - tail.x);
    const yDiff = Math.abs(head.y - tail.y);
    // should i move at all?
    if (xDiff <= 1 && yDiff <= 1) {
        // no
        return;
    }
    // where to?
    if (head.y === tail.y) { // they are both on the same rank
        if (head.x > tail.x) {
            // to the right
            tail.x++;
        } else if (head.x < tail.x) {
            // to the left
            tail.x--;
        }
    } else if (head.x === tail.x) { // they are both on the same file
        if (head.y < tail.y) {
            // up
            tail.y--;
        } else if (head.y > tail.y) {
            // down
            tail.y++;
        }
    } else {
        if (xDiff === 1) {
            tail.x = head.x;
            if (head.y < tail.y) { // head is above tail so to get to the right position we add 1 to head.y
                tail.y = head.y+1;
            } else {
                tail.y = head.y-1; // head is under tail so to get to the right position we subtract 1 form head.y
            }
        } else if (yDiff === 1) {
            tail.y = head.y;
            if (head.x > tail.x) { 
                tail.x = head.x-1;
            } else {
                tail.x = head.x+1;
            }
        } else if (xDiff === 2 && yDiff === 2) {
            if (head.y < tail.y) { // head is above tail so to get to the right position we add 1 to head.y
                tail.y = head.y+1;
            } else {
                tail.y = head.y-1; // head is under tail so to get to the right position we subtract 1 form head.y
            }
            if (head.x > tail.x) { 
                tail.x = head.x-1;
            } else {
                tail.x = head.x+1;
            }
        }
    }
    if (isFinal) {
        visitedPositions.push(JSON.parse(JSON.stringify(tail)));
    }
}

const debugPieces = () => {
    for (let y = -20; y <= 20; y++) {
        for (let x = -20; x <= 20; x++) {
            let found = false;
            for (let i = 0; i < 10; i++) {
                if (pieces[i].y === y && pieces[i].x === x) {
                    found = true;
                    if (i === 0) {
                        process.stdout.write('H');
                    } else {
                        process.stdout.write(i.toString());
                    }
                    break;
                } 
            }
            if (!found) {
                process.stdout.write('.');
            }
        }
        process.stdout.write("\n");
    }
}

const moveHead = (direction) => {
    switch (direction) {
        case 'R':
            pieces[0].x++;
            break;
        case 'L':
            pieces[0].x--;
            break;
        case 'U':
            pieces[0].y--;
            break;
        case 'D':
            pieces[0].y++;
            break;
    }
    for (let i = 1; i < 10; i++) {
        const head = pieces[i-1];
        const tail = pieces[i];
        moveTail(head, tail, i === 9, i);

        const xDiff = Math.abs(head.x - tail.x);
        const yDiff = Math.abs(head.y - tail.y);
        // should i move at all?
        if (xDiff > 1 && yDiff > 1) {
            throw new Error("dit kan niet");
        }
    

    }
}

const main = async () => {
    const lines = await (await fs.readFile('input.txt')).toString().split("\n").filter(line => line.trim().length > 0);
    //debugPieces();
    for (const line of lines) {
        const input = line.split(" ");
        const direction = input[0];
        const amount = parseInt(input[1]);
        for (let i = 0; i < amount; i++) {
            moveHead(direction);
        }
        //debugPieces();
        console.log(input);
    }

    const array = visitedPositions.map(p => `${p.y}, ${p.x}`);
    const filteredDuplicates = Array.from(new Set(array));
    for (let y = -6; y <= 5; y++) {
        for (let x = -11; x <= 10; x++) {
            if (filteredDuplicates.includes(`${y}, ${x}`)) {
                process.stdout.write('#');
            } else {
                process.stdout.write('.');
            }
        }
        process.stdout.write("\n");
    }
    
    console.log(filteredDuplicates.join("\n"))
    console.log(filteredDuplicates.length);
}
main();