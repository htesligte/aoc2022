const fs = require ('fs/promises');

const main = async () => {
    const buffer = await (await fs.readFile('aoc22d6xxl.txt'));
    for (let i = 0; i < buffer.length-13; i++) {
        const testStr = buffer.toString('utf8', i, i+14).split("");
        const testObj = {};
        let found = false;
        for (const char of testStr) {
            if (testObj[char]) {
                found = true;
            }
            testObj[char] = true;
        }
        if (!found) {
            console.log(i+14);
            return;
        }
        //console.log(str.substring(i, i+4));
    }
}
main();
