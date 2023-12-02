const fs = require('fs');

function parseInput(lines) {
  return lines.reduce((games, line) => {
    const [game, setString] = line.split(':');
    const [_, id] = game.split(' ');

    games[id] = {};

    const sets = setString.trim().split(';');

    sets.forEach(set => {
      const cubes = set.trim().split(',');

      cubes.forEach(cube => {
        const [amountStr, color] = cube.trim().split(' ');

        const amount = parseInt(amountStr);

        games[id][color] = Math.max(games[id][color] || 0, amount);
      });
    });

    return games;
  }, {});
}

function calculatePossibleGames(maxRed, maxGreen, maxBlue, games) {
  return Object.keys(games).reduce((possibleGames, id) => {
    const game = games[id];

    const redAmount = game['red'] || 0;
    const greenAmount = game['green'] || 0;
    const blueAmount = game['blue'] || 0;

    if (redAmount <= maxRed && greenAmount <= maxGreen && blueAmount <= maxBlue) {
      possibleGames[id] = game;
    }

    return possibleGames;
  }, {});
}

function calculateIdSum(possibleGames) {
  let sum = 0;

  Object.keys(possibleGames).forEach(id => {
    sum += parseInt(id);
  });

  return sum;
}


const lines = fs.readFileSync('./data', 'utf8').split('\n');

const games = parseInput(lines);
const possibleGames = calculatePossibleGames(12, 13, 14, games);
console.log(calculateIdSum(possibleGames));
