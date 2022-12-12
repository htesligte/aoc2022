const fs = require ('fs/promises');

const main = async () => {
    const str = await (await fs.readFile('input.txt')).toString().trim();
    for (let i = 0; i < str.length-3; i++) {
        const testStr = str.substring(i, i+4).split("");
        const testObj = {};
        let found = false;
        for (const char of testStr) {
            if (testObj[char]) {
                found = true;
            }
            testObj[char] = true;
        }
        if (!found) {
            console.log(i+4);
            return;
        }
        //console.log(str.substring(i, i+4));
    }
}
main();