import * as fs from 'fs';

const arrangeContainers = (containers: Array<string>): Array<Array<string>> => {
    /*
    Total size of container:
    (containerSize * 4) - 1 = rowLength
    containerSize = (rowLength + 1) / 4
    */
    const numberOfContainer = (containers[0].length + 1) / 4;
    const arrContainers = new Array(numberOfContainer).fill(null).map(() => []);

    containers.forEach(row => {
        const splitRow = row.match(/.{1,4}/g);
        const containerItems = splitRow.map(item => item.slice(1, 2));
        containerItems.forEach((item, index) => {
            item !== ' ' && arrContainers[index].push(item);
        });
    });
    return arrContainers.map(container => container.reverse()); // reverse to get the correct order. FIFO
};

const applyStep = (containers: Array<Array<string>>, step: string): Array<Array<string>> => {
    const splittedStep = step.split(' ');
    const numOfCrates = Number(splittedStep[1]);
    const cratesFromContainers = Number(splittedStep[3]) - 1; // -1 for index
    const cratesToContainers = Number(splittedStep[5]) - 1; // -1 for index

    for (let crate = 0; crate < numOfCrates; crate++) {
        const item = containers[cratesFromContainers].pop();
        containers[cratesToContainers].push(item);
    }
    return containers
};

// Part 1
fs.readFile('./input.txt', (err, rawData) => {
    const data = rawData.toString().split('\n');

    const findSplitIndex = data.findIndex(line => line === '');
    const containers = data.slice(0, findSplitIndex - 1); // -1 for the index number line
    const steps = data.slice(findSplitIndex + 1, data.length); // +1 for the empty line

    const arrangedContainers = arrangeContainers(containers);

    steps.forEach(step => {
        step !== '' && applyStep(arrangedContainers, step)
    })
    const secretMessage = arrangedContainers.map(container => container[container.length - 1]).join('')
    console.log("Part 1 Result:", secretMessage)  // VRWBSFZWM
});
