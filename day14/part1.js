/*
  Description:
*/
const fs = require('fs');

const map = fs.readFileSync('./data', 'utf8').split('\n').map(line => line.split(''));

function tiltMapNorth(map) {
  let mapChanged = false;

  for (let y = 1; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y - 1][x] === '.' && map[y][x] === 'O') {
        map[y - 1][x] = map[y][x];
        map[y][x] = '.';
        mapChanged = true;
      }
    }
  }

  if (mapChanged) {
    tiltMapNorth(map);
  }
}

function calculateWeight(map) {
  let totalWeight = 0;
  let weight = map.length;

  for (let y = 0; y < map.length; y++, weight--) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 'O') {
        totalWeight += weight;
      }
    }
  }

  return totalWeight;
}

tiltMapNorth(map);

console.log(map.map(line => line.join('')).join('\n'));
console.log(calculateWeight(map));

