const fs = require('fs/promises');

let instructions = [];
let X = 1;
const lineBreaks = [40, 80, 120, 160, 200, 240];
let loop = 0;
const main = async () => {
    const lines = await (await fs.readFile('input.txt')).toString().split("\n").filter(line => line.trim().length > 0);
    for (const line of lines) {
        const instruction = line.split(" ");
        if (instruction[0] === "addx") {
            instructions.push(["_noop"]);
            instruction[1] = parseInt(instruction[1]);
        }
        instructions.push(instruction);
    }
    for (let cycle = 0; cycle < instructions.length; cycle++) {
        if (X-1 === loop || X === loop || X+1 === loop) {
            process.stdout.write("#");
        } else {
            process.stdout.write(".");
        }
        if (instructions[cycle][0] === "addx") {
            X += instructions[cycle][1];
        }
        if (lineBreaks.includes(cycle+1)) {
            process.stdout.write("\n");
            loop = -1;
        }
        loop++;
    }
}
main();