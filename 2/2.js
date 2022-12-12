const fs = require("fs/promises");

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
const rock = 0;
const paper = 1;
const scissors = 2;

const gameScore = {
    X: lose,
    Y: draw,
    Z: win
};


const rules = [
    [scissors, rock, paper],
    [rock, paper, scissors],
    [paper, scissors, rock]
];

const getResult = (playerMove, myMove) => {
    return rules[playerMove][myMove]+1;
}


const main = async () => {
    const contents = await (await fs.readFile("input.txt")).toString();
    const lines = (contents.split("\n")).filter(line => line.trim().length > 0);
    let totalScore =0;
    for (const round of lines) {
        const [playerMove, myMove] = round.split(" ");
        const result =getResult(rockPaperScissors[playerMove], rockPaperScissors[myMove]); 
        console.log(result, gameScore[myMove]);
        const score = result + gameScore[myMove];
        console.log(score);
        totalScore += score;
    }
    console.log(totalScore);
}
main();