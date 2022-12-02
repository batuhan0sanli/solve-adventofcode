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

// Part 2
fs.readFile('./input.txt', (err, rawData) => {
    const data = rawData.toString().split('\n')

    const lengthOfTopElves = 3;
    let maxCalArr = Array(lengthOfTopElves).fill(0);
    let tmpCal = 0;

    data.forEach(calories => {
        if (calories) {
            tmpCal += Number(calories);
        } else {
            for (let i = 0; i < maxCalArr.length; i++) {
                if (tmpCal > maxCalArr[i]) {
                    maxCalArr[i] = tmpCal;
                    maxCalArr.sort((a, b) => a - b);  // maxCalArr must always be in ascending order
                    break;
                }
            }
            tmpCal = 0;
        }
    });
    const totalCalories = maxCalArr.reduce((a, b) => a + b);
    console.log("Top three Elves carrying the most Calories:", maxCalArr)  // [ 66765, 67045, 68775 ]
    console.log("Top three calories total: ", totalCalories)  // 202585
})
