import * as fs from 'fs';

const mkdir = (fileSystem: object, path: Array<string>, folder_name: string): object => {
    let tmp = fileSystem;
    path.forEach(path => {
        tmp = tmp[path]
    })
    tmp[folder_name] = {}
    return fileSystem
}

const touch = (fileSystem: object, path: Array<string>, file_name: string, file_size: Number): object => {
    let tmp = fileSystem;
    path.forEach(path => {
        tmp = tmp[path]
    })
    tmp[file_name] = file_size
    return fileSystem
}

const folderSize = (folder: object): number => {
    let size = 0;
    Object.keys(folder).forEach(key => {
        if (typeof folder[key] === 'number') {
            size += folder[key]
        } else {
            size += folderSize(folder[key])
        }
    })
    return size
}

const sumFolderSizeWithMaxSize = (folder: object, max_size: number): number => {
    let size = 0;
    Object.keys(folder).forEach(key => {
        if (typeof folder[key] === 'object') {
            const folder_size = folderSize(folder[key])
            if (folder_size < max_size) {
                size += folder_size
            }
            size += sumFolderSizeWithMaxSize(folder[key], max_size)
        }
    })
    return size
}

// Part 1
fs.readFile('./input.txt', (err, rawData) => {
    const data = rawData.toString().split('\n');
    const fileSystem = {'/': {}};
    let current_directory = [];
    data.forEach(line => {
        if (!line) {
            return;
        }
        if (line.startsWith('$')) {
            const command = line.split(' ')[1]
            const param = line.split(' ')[2]

            if (command === 'cd') {
                if (param === '..') {
                    current_directory.pop()
                } else if (param === '/') {
                    current_directory = ['/']
                } else {
                    current_directory.push(param)
                }

            } else if (command === 'ls') {
                return;
            }

            // line is result
        } else {
            if (line.startsWith('dir')) {
                const folder_name = line.split(' ')[1]
                mkdir(fileSystem, current_directory, folder_name)
            } else {
                const file_size = Number(line.split(' ')[0])
                const file_name = line.split(' ')[1]
                touch(fileSystem, current_directory, file_name, file_size)
            }
        }
    });
    /// console.log(fileSystem)
    const size = sumFolderSizeWithMaxSize(fileSystem, 100000)
    console.log("Part 1 Result:", size) // 919137
});

// Part 2
const getMinDeleteFolderSize = (folder: object, minDeleteSize: number): number => {
    let minSize = Infinity;
    Object.keys(folder).forEach(key => {
        if (typeof folder[key] === 'object') {
            const folder_size = folderSize(folder[key])
            if (folder_size >= minDeleteSize && minSize > folder_size) {
                minSize = folder_size
            }
            const minSizeInFolder = getMinDeleteFolderSize(folder[key], minDeleteSize)
            if (minSizeInFolder < minSize) {
                minSize = minSizeInFolder
            }
        }
    })
    return minSize
}

fs.readFile('./input.txt', (err, rawData) => {
    const data = rawData.toString().split('\n');
    const fileSystem = {'/': {}};
    let current_directory = [];
    data.forEach(line => {
        if (!line) {
            return;
        }
        if (line.startsWith('$')) {
            const command = line.split(' ')[1]
            const param = line.split(' ')[2]

            if (command === 'cd') {
                if (param === '..') {
                    current_directory.pop()
                } else if (param === '/') {
                    current_directory = ['/']
                } else {
                    current_directory.push(param)
                }

            } else if (command === 'ls') {
                return;
            }

            // line is result
        } else {
            if (line.startsWith('dir')) {
                const folder_name = line.split(' ')[1]
                mkdir(fileSystem, current_directory, folder_name)
            } else {
                const file_size = Number(line.split(' ')[0])
                const file_name = line.split(' ')[1]
                touch(fileSystem, current_directory, file_name, file_size)
            }
        }
    });
    const totalSize = folderSize(fileSystem)
    const maxCapacity = 70000000
    const updateSize = 30000000
    const minDeleteSize = updateSize + totalSize - maxCapacity

    const size = getMinDeleteFolderSize(fileSystem, minDeleteSize)
    console.log("Part 2 Result:", size) // 2877389
});
