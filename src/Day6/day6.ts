import * as fs from 'fs';

const isOnlyDistinctCharacters = (message: string): boolean => {
    const setMessage = new Set(message);
    return setMessage.size === message.length;
}

// Part 1
fs.readFile('./input.txt', (err, rawData) => {
    const data = rawData.toString().split('\n');
    const characters = data[0].split('');
    const sizeOfDifferentCharacters = 4;

    let findIndex;
    for (let i=0; i<characters.length; i++) {
        const testMessage = characters.slice(i, i+sizeOfDifferentCharacters).join('');
        if (isOnlyDistinctCharacters(testMessage)) {
            findIndex = i + sizeOfDifferentCharacters;
            break;
        }
    }
    console.log("Part 1 Result:", findIndex)  // 1647
});

// Part 2
fs.readFile('./input.txt', (err, rawData) => {
    const data = rawData.toString().split('\n');
    const characters = data[0].split('');
    const sizeOfDifferentCharacters = 14;

    let findIndex;
    for (let i=0; i<characters.length; i++) {
        const testMessage = characters.slice(i, i+sizeOfDifferentCharacters).join('');
        if (isOnlyDistinctCharacters(testMessage)) {
            findIndex = i + sizeOfDifferentCharacters;
            break;
        }
    }
    console.log("Part 2 Result:", findIndex)  // 2447
});