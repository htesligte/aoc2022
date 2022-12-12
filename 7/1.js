const { ChildProcess } = require('child_process');
const fs = require('fs/promises');

const dirSizes = {};
const dirParents = [];

const getValidDirSize = (dir) => {
    
    // get childs
    let currentSize = dirSizes[dir];
    if (!currentSize) {
        currentSize = 0;
    }
    if (currentSize > 100000) {
        return -1;
    }
    const childs = dirParents.filter(child => child.parents === dir);
    for (const child of childs) {
        const size = getValidDirSize(child.key);
        if (size === -1 || size > 100000) {
            return -1;
        }
        currentSize += size;
    }
    return currentSize;
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
                // TODO HERE dirSizes[curDir] += parseInt(contents[0]);
            }
        }
    }
    let totalSizes = 0;
    console.log(dirSizes);
    for (const item of dirParents) {
        //console.log(item.parents, item.key);
        const curSize = getValidDirSize(item.key);
        if (curSize > -1 && curSize <= 100000) {
            totalSizes += curSize;
        }
    }
    console.log(totalSizes)
    /*
    let totalSizes = 0;
    console.log(dirSizes);
    for (const dir of Object.keys(dirSizes)) {
        const dirSize = getValidDirSize(dir);
        console.log(dir, dirSize);
        if (dirSize !== -1) {
            totalSizes += dirSize;
        }
    }
    console.log(totalSizes);*/
}
main();