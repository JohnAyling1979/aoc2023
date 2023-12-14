/*
  Description:
*/
const fs = require('fs');

const map = fs.readFileSync('./data', 'utf8').split('\n').map(line => line.split(''));
const cycles = 109; // 109 is when the pattern starts repeating and (1000000000 - 109) / 9 has no remainder

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

function tiltMapEast(map) {
  let mapChanged = false;

  for (let y = 0; y < map.length; y++) {
    for (let x = map[y].length - 2; x >= 0; x--) {
      if (map[y][x + 1] === '.' && map[y][x] === 'O') {
        map[y][x + 1] = map[y][x];
        map[y][x] = '.';
        mapChanged = true;
      }
    }
  }

  if (mapChanged) {
    tiltMapEast(map);
  }
}

function tiltMapSouth(map) {
  let mapChanged = false;

  for (let y = map.length - 2; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y + 1][x] === '.' && map[y][x] === 'O') {
        map[y + 1][x] = map[y][x];
        map[y][x] = '.';
        mapChanged = true;
      }
    }
  }

  if (mapChanged) {
    tiltMapSouth(map);
  }
}

function tiltMapWest(map) {
  let mapChanged = false;

  for (let y = 0; y < map.length; y++) {
    for (let x = 1; x < map[y].length; x++) {
      if (map[y][x - 1] === '.' && map[y][x] === 'O') {
        map[y][x - 1] = map[y][x];
        map[y][x] = '.';
        mapChanged = true;
      }
    }
  }

  if (mapChanged) {
    tiltMapWest(map);
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

for (let i = 0; i < cycles; i++) {
  tiltMapNorth(map);
  tiltMapWest(map);
  tiltMapSouth(map);
  tiltMapEast(map);
}

console.log(map.map(line => line.join('')).join('\n'));
console.log(calculateWeight(map));

