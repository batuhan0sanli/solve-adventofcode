import * as fs from 'fs';

const rpsPoint = {
    rock: 1,
    paper: 2,
    scissors: 3
};

const turnRps = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
    X: 'rock',
    Y: 'paper',
    Z: 'scissors',
};

const winsTable = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
};

const getWinner = (player1: string, player2: string) => {
    if (player1 === player2) {
        return 'draw';
    } else if (winsTable[player1] === player2) {
        return 'player1';
    } else {
        return 'player2';
    }
}

const getPoints = (player1: string, player2: string) => {
    const winner = getWinner(player1, player2);
    let result;
    if (winner === 'draw') {
        result = [3, 3];
    } else if (winner === 'player1') {
        result = [6, 0];
    } else {
        result = [0, 6];
    }
    return {
        player1: result[0] + rpsPoint[player1],
        player2: result[1] + rpsPoint[player2]
    }
}

// Part 1
fs.readFile('./input.txt', (err, rawData) => {
    const data = rawData.toString().split('\n');
    let player1 = 0;
    let player2 = 0;

    data.forEach(line => {
        if (line) {
            const [p1, p2] = line.split(' ');
            const points = getPoints(turnRps[p1], turnRps[p2]);
            player1 += points.player1;
            player2 += points.player2;
        }
    });
    console.log("Player 1 score:", player1);  // 11270
    console.log("Player 2 (YOU) score:", player2);  // 14375
});

// Part 2
const turnMove = {
    X: 'lose',
    Y: 'draw',
    Z: 'win',
}

const getHandShape = (opponentShape: string, round: string) => {
    if (round === 'draw') {
        return opponentShape
    } else if (round === 'win') {
        return winsTable[winsTable[opponentShape]];
    } else {
        return winsTable[opponentShape];
    }
}

fs.readFile('./input.txt', (err, rawData) => {
    const data = rawData.toString().split('\n');
    let player1 = 0;
    let player2 = 0;

    data.forEach(line => {
        if (line) {
            const [p1, p2] = line.split(' ');
            const p2Shape = getHandShape(turnRps[p1], turnMove[p2])
            const points = getPoints(turnRps[p1], p2Shape);
            player1 += points.player1;
            player2 += points.player2;
        }
    });
    console.log("Player 1 score:", player1);  // 15581
    console.log("Player 2 (YOU) score:", player2);  // 10274
});
