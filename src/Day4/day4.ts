import * as fs from 'fs';

const isFullyContain = (elf1: string, elf2: string): boolean => {
    const elf1Sections = elf1.split('-').map((section => Number(section)))
    const elf2Sections = elf2.split('-').map((section => Number(section)))

    if (elf1Sections[0] <= elf2Sections[0] && elf1Sections[1] >= elf2Sections[1])
        return true;
    else
        return elf1Sections[0] >= elf2Sections[0] && elf1Sections[1] <= elf2Sections[1];
};

// Part 1
fs.readFile('./input.txt', (err, rawData) => {
    const data = rawData.toString().split('\n');
    let totalOfFullyContain = 0;
    data.forEach(pairs => {
        if (!pairs) {
            return;
        }
        const elf1 = pairs.split(',')[0]
        const elf2 = pairs.split(',')[1]
        if (isFullyContain(elf1, elf2)) {
            totalOfFullyContain += 1
        }
    })
    console.log("Assignment pairs does one range fully contain the other:", totalOfFullyContain)  // 413
});

// Part 2
const isOverlap = (elf1: string, elf2: string): boolean => {
    const elf1Sections = elf1.split('-').map((section => Number(section)))
    const elf2Sections = elf2.split('-').map((section => Number(section)))

    if (elf1Sections[1] >= elf2Sections[0] && elf1Sections[0] <= elf2Sections[1])
        return true;
    else
        return elf1Sections[1] <= elf2Sections[0] && elf1Sections[0] >= elf2Sections[1]
};

fs.readFile('./input.txt', (err, rawData) => {
    const data = rawData.toString().split('\n');
    let totalOfOverlap = 0;
    data.forEach(pairs => {
        if (!pairs) {
            return;
        }
        const elf1 = pairs.split(',')[0]
        const elf2 = pairs.split(',')[1]
        if (isOverlap(elf1, elf2)) {
            totalOfOverlap += 1
        }
    })
    console.log("Assignment pairs do the ranges overlap:", totalOfOverlap)  // 413
});
