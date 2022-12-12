const fs = require('fs/promises');

const main = async() => {
    const contents = await (await fs.readFile('input.txt')).toString();
    const elfCalories = contents.split('\n\n');
    const totalElfCalories = [];
    let maxElfCalories = 0;
    for (const elfCalory of elfCalories) {
        const calories = elfCalory.split('\n');
        let totalCalories =0;
        for (const calory of calories) {
            totalCalories += parseInt(calory);
        }
        if (totalCalories > maxElfCalories) {
            maxElfCalories = totalCalories;
        }
        totalElfCalories.push(totalCalories);
    }
    console.log(maxElfCalories);
}
main();