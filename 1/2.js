const fs = require('fs/promises');

const main = async() => {
    const contents = await (await fs.readFile('input.txt')).toString();
    const elfCalories = contents.split('\n\n');
    let totalElfCalories = [];
    let maxElfCalories = 0;
    for (const elfCalory of elfCalories) {
        const calories = elfCalory.split('\n');
        let totalCalories =0;
        for (const calory of calories) {
            const intValue = parseInt(calory);
            if (!intValue) {
                console.log("skipping", intValue);
                continue;
            }
            totalCalories += parseInt(calory);
        }
        if (totalCalories > maxElfCalories) {
            maxElfCalories = totalCalories;
        }
        totalElfCalories.push(totalCalories);
    }
    totalElfCalories = totalElfCalories.sort(function (a, b) {  return a - b;  });
    //console.log(totalElfCalories.at(-2) + totalElfCalories.at(-3) + totalElfCalories.at(-4));
    console.log(totalElfCalories.at(-1), totalElfCalories.at(-2), totalElfCalories.at(-3), totalElfCalories.at(-4));
    console.log(totalElfCalories.at(-1)+ totalElfCalories.at(-2)+ totalElfCalories.at(-3));
}
main();