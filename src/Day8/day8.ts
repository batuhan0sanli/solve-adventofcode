import * as fs from 'fs';

const checkFromLeft = map => {
    map.forEach((line, lineIndex) => {
        let maxTreeLength = 0;
        if (maxTreeLength === 10) return;
        line.forEach((treeLength, treeIndex) => {
            treeLength = Math.abs(treeLength)
            if (treeLength > maxTreeLength) {
                maxTreeLength = treeLength
                if (treeLength > 0) map[lineIndex][treeIndex] = -treeLength  // flag seeing
            }
        })
    })
}

const checkFromRight = map => {
    map.forEach((line, lineIndex) => {
        let maxTreeLength = 0;
        if (maxTreeLength === 10) return;
        line.slice().reverse().forEach((treeLength, treeIndex) => {
            treeIndex = line.length - treeIndex - 1 // -1 for index
            treeLength = Math.abs(treeLength)
            if (treeLength > maxTreeLength) {
                maxTreeLength = treeLength
                if (treeLength > 0) map[lineIndex][treeIndex] = -treeLength  // flag seeing
            }
        })
    })
}

const checkFromTop = map => {
    for (let columnIndex=0; columnIndex<map[0].length; columnIndex++) {
        let maxTreeLength = 0;
        if (maxTreeLength === 10) return;
        for (let lineIndex=0; lineIndex<map.length; lineIndex++) {
            const treeLength = Math.abs(map[lineIndex][columnIndex]);
            if (treeLength > maxTreeLength) {
                maxTreeLength = treeLength
                if (treeLength > 0) map[lineIndex][columnIndex] = -treeLength  // flag seeing
            }
        }
    }
}

const checkFromBottom = map => {
    for (let columnIndex=0; columnIndex<map[0].length; columnIndex++) {
        let maxTreeLength = 0;
        if (maxTreeLength === 10) return;
        for (let lineIndex=0; lineIndex<map.length; lineIndex++) {
            const lineIndexEdited = map.length - lineIndex - 1
            const treeLength = Math.abs(map[lineIndexEdited][columnIndex]);
            if (treeLength > maxTreeLength) {
                maxTreeLength = treeLength
                if (treeLength > 0) map[lineIndexEdited][columnIndex] = -treeLength  // flag seeing
            }
        }
    }
}

const totalNegative = map => {
    let total = 0;
    map.forEach(line => {
        line.forEach(treeLength => {
            if (treeLength < 0) {
                total += 1;
            }
        })
    })
    return total;
}

// Part 1
fs.readFile('./input.txt', (err, rawData) => {
    const data = rawData.toString().split('\n');
    const map = [];

    data.forEach(line => {
        if (!line) {
            return;
        }

        map.push(line.split('').map(x => Number(x) + 1)) // add1 for 0 non zero
    });
    console.log("start:", map[1][1])
    checkFromLeft(map);
    console.log("left", map[1][1])
    checkFromRight(map);
    console.log("right", map[1][1])
    checkFromTop(map);
    console.log("top", map[1][1])
    checkFromBottom(map);
    console.log("bottom", map[1][1])
    const total = totalNegative(map);
    map.forEach(line => {console.log(line.join(''))})
    console.log("Part 1: ", total);
});
