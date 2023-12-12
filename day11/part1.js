/*
  Description:
*/
const fs = require('fs');

const lines = expandSpace(fs.readFileSync('./data', 'utf8').split('\n').map(line => line.split('')));

function expandSpace(lines) {
  const emptyColumns = [];
  const emptyRows = [];

  lines.forEach((line, y) => {
    if (line.every(char => char === '.')) {
      emptyRows.push(y);
    }
  });

  for (let x = 0; x < lines[0].length; x++) {
    let empty = true;
    for (let y = 0; y < lines.length; y++) {
      if (lines[y][x] !== '.') {
        empty = false;
        break;
      }
    }
    if (empty) {
      emptyColumns.push(x);
    }
  }


  emptyRows.forEach((y, index) => {
    lines.splice(y + index, 0, new Array(lines[0].length).fill('.'));
  });

  emptyColumns.forEach((x, index) => {
    lines.forEach(line => line.splice(x + index, 0, '.'));
  });

  return lines;
}

const galaxies = {};
let galaxyId = 1;

lines.forEach((line, y) => {
  line.forEach((char, x) => {
    if (char === '#') {
      galaxies[galaxyId] = {
        x,
        y,
      };
      galaxyId++;
    }
  });
});

const pairs = {};

Object.keys(galaxies).forEach(galaxyId1 => {
  Object.keys(galaxies).forEach(galaxyId2 => {
    if (galaxyId1 < galaxyId2) {
      const galaxy1 = galaxies[galaxyId1];
      const galaxy2 = galaxies[galaxyId2];

      const distance = Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y);

      if (!pairs[galaxyId1]) {
        pairs[galaxyId1] = {};
      }
      pairs[galaxyId1][galaxyId2] = distance;
    }
  });
});

let sum = 0;

Object.keys(pairs).forEach(galaxyId1 => {
  Object.keys(pairs[galaxyId1]).forEach(galaxyId2 => {
    sum += pairs[galaxyId1][galaxyId2];
  });
});

console.log(sum);