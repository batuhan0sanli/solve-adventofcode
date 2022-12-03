import * as fs from 'fs';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const letterPriority = (letter: string) => {
    const bigAlphabet = alphabet.toUpperCase();
    return (alphabet + bigAlphabet).indexOf(letter) + 1;  // letter priority starts from 1
}

// Part 1
fs.readFile('./input.txt', (err, rawData) => {
    const data = rawData.toString().split('\n');
    let totalPriority = 0;
    data.forEach(row => {
        if (row) {
            const compartment1 = row.slice(0, row.length / 2);
            const compartment2 = row.slice(row.length / 2);
            const compartment2Set = new Set(compartment2);

            const intersection = new Set(compartment1.split('').filter(x => compartment2Set.has(x)));
            const priority = Array.from(intersection).reduce((acc, letter) => acc + letterPriority(letter), 0);
            totalPriority += priority;
        }
    });
    console.log("Total priority: ", totalPriority);  // 8085
});

// Part 2
const findIntersections = (compartments: Array<string>): Set<string> => {
    return compartments.reduce((acc, compartment) => {
        return new Set(compartment.split('').filter(x => acc.has(x)));
    }, new Set(compartments[0]));
}

const groupArray = (arr: Array<any>, size: number): Array<any> => {
    let groupedArray = [];
    arr.reduce((acc, value) => {
        if (acc.length === size - 1) {
            acc.push(value)
            groupedArray.push(acc);
            return [];
        } else {
            acc.push(value);
            return acc;
        }
    }, []);
    return groupedArray;
};

fs.readFile('./input.txt', (err, rawData) => {
    const data = rawData.toString().split('\n');
    let totalPriority = 0;
    const groupedData = groupArray(data, 3);

    groupedData.forEach(rucksacks => {
        const intersection = findIntersections(rucksacks);
        const priority = Array.from(intersection).reduce((acc, letter) => acc + letterPriority(letter), 0);
        totalPriority += priority;
    });
    console.log("Sum of the priorities of those item types: ", totalPriority);  // 2515
});
