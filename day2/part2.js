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

function calculatePower(games) {
  return Object.keys(games).reduce((power, id) => {
    const game = games[id];

    const redAmount = game['red'] || 0;
    const greenAmount = game['green'] || 0;
    const blueAmount = game['blue'] || 0;

    power += redAmount * greenAmount * blueAmount;

    return power;
  }, 0);
}

const lines = fs.readFileSync('./data', 'utf8').split('\n');

const games = parseInput(lines);
console.log(calculatePower(games));
