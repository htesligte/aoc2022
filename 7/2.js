const fs = require('fs/promises');

const dirSizes = {};
const dirParents = [];

const getValidDirSize = (dir) => {
    
    // get childs
    let currentSize = dirSizes[dir];
    if (!currentSize) {
        currentSize = 0;
    }
    const childs = dirParents.filter(child => child.parents === dir);
    for (const child of childs) {
        const size = getValidDirSize(child.key);
        currentSize += size;
    }
    return currentSize;
}

const getTotalSize = () => {
    let totalSize =0;
    for (const key of Object.keys(dirSizes)) {
        totalSize += dirSizes[key];
    }
    return totalSize;
}


const main = async () => {
    let currentParents = [];
    let curMode = "";
    let curDir = "";
    const lines = await (await fs.readFile('input.txt')).toString().split("\n").filter(line => line.trim().length > 0);

    for (let curPos = 0; curPos < lines.length; curPos++) {
        const currentLine = lines[curPos];
        if (currentLine.startsWith("$")) {
            const command = currentLine.split(" ");
            if (command[1] === "ls") {
                curMode = "ls";
            } else if (command[1] === "cd") {
                if (command[2] === "..") {
                    // navigate to parent
                    curDir = currentParents.pop();
                } else {
                    currentParents.push(curDir);
                    
                    curDir = command[2];
                }
                curMode = "cd";
            }
        } else if (curMode = "ls") {
            const contents = currentLine.split(' ');
            if (contents[0] === 'dir') {
                const copyParents = JSON.parse(JSON.stringify(currentParents));
                copyParents.push(curDir);
                dirParents.push({dir: contents[1], parents: copyParents.join("-"), key: [...currentParents, curDir, contents[1]].join("-")});
            } else {
                const key = [...currentParents, curDir].join("-");
                if (!dirSizes[key]) {
                    dirSizes[key] = 0;
                }
                dirSizes[key] += parseInt(contents[0]);
            }
        }
    }
    //console.log(getTotalSize());
    const totalSize = getTotalSize();
    const maxdiskspace = 70000000;
    const currentdiff = maxdiskspace - totalSize;
    const freeSpaceMax = 30000000;
    const tocleanup = freeSpaceMax - currentdiff;
    console.log("currently i have ", currentdiff, "diskspace available. I need to get this to", freeSpaceMax, "so i need to clean up ", tocleanup);
    let bestcandidate = totalSize;
    for (const item of dirParents) {
        const curSize = getValidDirSize(item.key);
        if (curSize > tocleanup) {
            if (curSize < bestcandidate) {
                bestcandidate = curSize;
            }
        }
    }
    console.log(bestcandidate);
}
main();
