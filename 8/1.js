const fs = require('fs/promises');

let grid = null;
let maxX = 0;
let maxY = 0;

const isVisibleFn = (posX, posY) => {
    const digit = grid[posY][posX];
    let left = true;
    let right = true;
    let top = true;
    let bottom = true;

    // check left
    for (let x = posX-1; x >= 0; x--) {
        const valueLeft = grid[posY][x];
        if (grid[posY][x] >= digit) {
            left = false;
            break;
        }
    }
    if (left) {
        return true;
    }

    // check right
    for (let x = posX+1; x <= maxX; x++) {
        const valueRight = grid[posY][x];
        if (grid[posY][x] >= digit) {
            right = false;
            break;
        }
    }
    if (right) {
        return true;
    }

    // check top
    for (let y = posY-1; y >= 0; y--) {
        const valueTop = grid[y][posX];
        if (grid[y][posX] >= digit) {
            top = false;
            break;
        }
    }
    if (top) {
        return true;
    }

    // check bottom
    for (let y = posY+1; y <= maxY; y++) {
        const valueBottom = grid[y][posX];
        if (grid[y][posX] >= digit) {
            bottom = false;
            break;
        }
    }
    if (bottom) {
        return true;
    }
    return false;
}

const main = async () => {
    const lines = await (await fs.readFile('input.txt')).toString().split("\n").filter(line => line.trim().length > 0);
    grid = lines.map(line => line.split("").map(d => parseInt(d)));
    maxX = grid[0].length-1;
    maxY = grid.length-1;
    
    //console.log(grid, maxX, maxY);
    //let visible = ((maxX+1) * 2) + ((maxY+1) * 2)-4;
    //console.log(visible);
    let visible = 0;
    for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x <= maxX; x++) {
            let isVisible = false;
            if (y === 0 || y === maxY || x === 0 || x === maxX) {
                isVisible = true;
            }
            if (!isVisible && isVisibleFn(x, y)) {
                isVisible = true;
            }
            if (isVisible) {
                console.log(y, x);
                visible++;
            }
        }
    }
    console.log(visible);

}
main();