const fs = require("fs/promises");
const game = {
    rock: {
        shape: 1
    },
    paper: {
        shape: 2
    },
    scissors: {
        shape: 3
    }
};
const rockPaperScissors = {};
rockPaperScissors["A"] = 0;
rockPaperScissors["B"] = 1;
rockPaperScissors["C"] = 2;
rockPaperScissors["X"] = 0;
rockPaperScissors["Y"] = 1;
rockPaperScissors["Z"] = 2;


const win = 6;
const lose = 0;
const draw = 3;

const rules = [
    [draw, lose, win],
    [win, draw, lose],
    [lose, win, draw]
];

const getResult = (playerMove, myMove) => {
    return rules[myMove][playerMove];
}


const main = async () => {
    const contents = await (await fs.readFile("input.txt")).toString();
    const lines = (contents.split("\n")).filter(line => line.trim().length > 0);
    let totalScore =0;
    for (const round of lines) {
        const [playerMove, myMove] = round.split(" ");
        const score = getResult(rockPaperScissors[playerMove], rockPaperScissors[myMove]) + (rockPaperScissors[myMove]+1);
        totalScore += score;
    }
    console.log(totalScore);
}
main();