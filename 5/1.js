const fs = require('fs/promises');
/*class stack {
    items =[];
    top = null;
    add = (crate) => {
        this.items.push(crate);
        top = crate;
    }
    pop = () => {
        
    }
}*/
const stacks = [];
const main = async () => {
    /*
[T] [V]                     [W]    
[V] [C] [P] [D]             [B]    
[J] [P] [R] [N] [B]         [Z]    
[W] [Q] [D] [M] [T]     [L] [T]    
[N] [J] [H] [B] [P] [T] [P] [L]    
[R] [D] [F] [P] [R] [P] [R] [S] [G]
[M] [W] [J] [R] [V] [B] [J] [C] [S]
[S] [B] [B] [F] [H] [C] [B] [N] [L]
*/

    stacks.push("S,M,R,N,W,J,V,T".split(","));
    stacks.push("B,W,D,J,Q,P,C,V".split(","));
    stacks.push("B,J,F,H,D,R,P".split(","));
    stacks.push("F,R,P,B,M,N,D".split(','));
    stacks.push("H,V,R,P,T,B".split(","));
    stacks.push("C,B,P,T".split(","));
    stacks.push("B,J,R,P,L".split(","));
    stacks.push("N,C,S,L,T,Z,B,W".split(","));
    stacks.push("L,S,G".split(","));

    const contents = await (await fs.readFile('input.txt')).toString();
    const lines = contents.split("\n").filter(line => line.startsWith("move"));
    const regex = /move ([0-9]+) from ([0-9]) to ([0-9])/g;
    for (const line of lines) {
        const matches = [...line.matchAll(regex)];
        const amount = parseInt(matches[0][1]);
        const from = parseInt(matches[0][2]);
        const to = parseInt(matches[0][3]);
        for (let i = 0; i < amount; i++) {
            const item = stacks[from-1].pop();
            stacks[to-1].push(item);
        }
    }
    let message = "";
    for (const stack of stacks) {
        message += stack.pop();
    }
    console.log(message);
}

main();