let currentStack = [
    [63, 84, 80, 83, 84, 53, 88, 72],
    [67, 56, 92, 88, 84],
    [59, 53, 60, 92, 69, 72],
    [61, 52, 55, 61],
    [79, 53],
    [59, 86, 67, 95, 92, 77, 91],
    [58, 83, 89]
];
let counter = [
    0,0,0,0,0,0,0
]

function pushFn(i, n) {
    //console.log(`and throws value ${n} to ${i}`);
    currentStack[i].push(n);
}

const main = () => {
    for (let loop = 0; loop < 20; loop++) {
        for (let i = 0; i < currentStack.length; i++) {
            while (currentStack[i].length > 0) {
                counter[i]++;
                const v = currentStack[i].shift();
                let n = 0;
      //          console.log(`monkey ${i} inspects an item with a worry level of ${v}`)
                switch(i) {
                    case 0:
                        n = parseInt((v * 19) / 3);
                        n % 23 === 0 ? pushFn(2, n) : pushFn(3,n);
                        break;
                    case 1:
                        n = parseInt((v + 6) / 3);
                        n % 19 === 0 ? pushFn(2,n) : pushFn(0,n);
                        break;
                    case 2:
                        n = parseInt((v * v) / 3);
                        n % 13 === 0 ? pushFn(1,n) : pushFn(3,n);
                        break;
                    case 3:
                        n = parseInt((v + 3) / 3);
                        n % 17 === 0 ? pushFn(0,n) : pushFn(1,n);
                        break;
                }
            }
        }
        //currentStack = JSON.parse(JSON.stringify(currentStack));
        //currentStack = [[],[],[],[]];
        //console.log(currentStack);
    }
    console.log(counter);
}
main();