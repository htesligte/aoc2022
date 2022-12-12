const fs = require('fs/promises');

let instructions = [];
let X = 1;
const interestingCycles = [20, 60, 100, 140, 180, 220];
let totalValue =0;
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
        if (interestingCycles.includes(cycle+1)) {
            //console.log(cycle+1, X, (cycle+1)*X);
            totalValue += (cycle+1)*X;
        }
        if (instructions[cycle][0] === "addx") {
            X += instructions[cycle][1];
        }
    }
    console.log(totalValue);
}
main();