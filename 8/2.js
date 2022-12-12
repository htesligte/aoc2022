const fs = require('fs/promises');

let grid = null;
let maxX = 0;
let maxY = 0;

const getScenicScore = (posX, posY) => {
    const digit = grid[posY][posX];
    let left = true;
    let right = true;
    let top = true;
    let bottom = true;

    let scenicElements = {left: 0, right: 0, top: 0, bottom: 0};

    // check left
    for (let x = posX-1; x >= 0; x--) {
        const valueLeft = grid[posY][x];
        if (grid[posY][x] >= digit) {
            scenicElements.left = (posX - x);
            break;
        }
    }
    if (scenicElements.left === 0) {
        scenicElements.left = posX;
    }
    
    // check right
    for (let x = posX+1; x <= maxX; x++) {
        const valueRight = grid[posY][x];
        if (grid[posY][x] >= digit) {
            scenicElements.right = x - posX;
            break;        
        }
    }
    if (scenicElements.right === 0) {
        scenicElements.right = Math.abs(maxX - posX);
    }
    
    // check top
    for (let y = posY-1; y >= 0; y--) {
        const valueTop = grid[y][posX];
        if (grid[y][posX] >= digit) {
            scenicElements.top = (posY - y);
            break;
        }
    }
    if (scenicElements.top === 0) {
        scenicElements.top = posY;
    }

    // check bottom
    for (let y = posY+1; y <= maxY; y++) {
        const valueBottom = grid[y][posX];
        if (grid[y][posX] >= digit) {
            scenicElements.bottom = (y - posY);
            break;
        }
    }
    if (scenicElements.bottom === 0) {
        scenicElements.bottom = maxY - posY;
    }
    return scenicElements.left * scenicElements.right * scenicElements.top * scenicElements.bottom;
}

const main = async () => {
    const lines = await (await fs.readFile('input.txt')).toString().split("\n").filter(line => line.trim().length > 0);
    grid = lines.map(line => line.split("").map(d => parseInt(d)));
    maxX = grid[0].length-1;
    maxY = grid.length-1;
    
    //console.log(grid, maxX, maxY);
    //let visible = ((maxX+1) * 2) + ((maxY+1) * 2)-4;
    //console.log(visible);
    let maxScore = 0;
    for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x <= maxX; x++) {
            if (y === 0 || y === maxY || x === 0 || x === maxX) {
                continue;
            }
            /*if (!isVisible && isVisibleFn(x, y)) {
                isVisible = true;
            }*/
            /*if (isVisible) {
                console.log(y, x);
                visible++;
            }*/
            const currentScore = getScenicScore(x, y);
            //console.log(y, x, getScenicScore(x, y));
            if (currentScore > maxScore) {
                maxScore = currentScore;
            }
        }
    }
    console.log(maxScore);

}
main();