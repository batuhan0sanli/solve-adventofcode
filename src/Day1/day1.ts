import * as fs from 'fs';

// Part 1
fs.readFile('./input.txt', (err, rawData) => {
    const data = rawData.toString().split('\n')

    let maxCal = 0;
    let tmpCal = 0;

    data.forEach(calories => {
        if (calories) {
            tmpCal += Number(calories);
        } else {
            tmpCal > maxCal ? maxCal = tmpCal : null;

            tmpCal = 0;
        }
    })
    console.log("Max total calories:", maxCal)  //68775
})
