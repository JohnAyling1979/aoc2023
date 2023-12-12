/*
  Description:
*/
const fs = require('fs');

const lines = fs.readFileSync('./data', 'utf8').split('\n').map(line => line.split(''));

const expand = 999999;

function getExpandSpaceZone(lines) {
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

  return {
    emptyColumns,
    emptyRows
  }
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
const {
  emptyColumns,
  emptyRows
} = getExpandSpaceZone(lines);

Object.keys(galaxies).forEach(galaxyId1 => {
  Object.keys(galaxies).forEach(galaxyId2 => {
    if (galaxyId1 < galaxyId2) {
      const galaxy1 = galaxies[galaxyId1];
      const galaxy2 = galaxies[galaxyId2];

      const minX = Math.min(galaxy1.x, galaxy2.x);
      const maxX = Math.max(galaxy1.x, galaxy2.x);
      const minY = Math.min(galaxy1.y, galaxy2.y);
      const maxY = Math.max(galaxy1.y, galaxy2.y);

      let distance = maxX - minX + maxY - minY;

      emptyColumns.forEach(column => {
        if (minX < column && column < maxX) {
          distance += expand;
        }
      });

      emptyRows.forEach(row => {
        if (minY < row && row < maxY) {
          distance += expand;
        }
      });

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