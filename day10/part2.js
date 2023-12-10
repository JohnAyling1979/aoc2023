/*
*/
const fs = require('fs');

let start;
const visited = {};

const map = fs.readFileSync('./test3', 'utf8').split('\n').map((line, yIndex) => line.split('').map((char, xIndex) => {
  if (char === 'S') {
    start = { x: xIndex, y: yIndex, direction: 'U' };
  }

  return char;
}));

function loadPaths(node) {
  const { x, y, direction } = node;
  const next = [];
  const key = `${x},${y}`;

  if (visited[key]) {
    return;
  }

  visited[`${x},${y}`] = true;

  const location = map[y][x];

  if (location === 'S') {
    const up = y - 1;

    next.push({ x, y: up, direction: 'U' });
    map[y][x] = 'U';
  } else if (location === '|') {
    const up = y - 1;
    const down = y + 1;

    map[y][x] = direction;

    if (!visited[`${x},${up}`]) {
      next.push({ x, y: up, direction });
    } else {
      next.push({ x, y: down, direction });
    }
  } else if (location === '-') {
    const left = x - 1;
    const right = x + 1;

    map[y][x] = direction;

    if (!visited[`${left},${y}`]) {
      next.push({ x: left, y, direction });
    } else {
      next.push({ x: right, y, direction });
    }
  } else if (location === 'L') {
    const up = y - 1;
    const right = x + 1;

    if (!visited[`${x},${up}`]) {
      next.push({ x, y: up, direction: 'U' });
      map[y][x] = 'U';
    } else {
      next.push({ x: right, y, direction: 'D' });
      map[y][x] = 'D';
    }
  } else if (location === 'J') {
    const up = y - 1;
    const left = x - 1;

    if (!visited[`${x},${up}`]) {
      next.push({ x, y: up, direction: 'U' });
      map[y][x] = 'U';
    } else {
      next.push({ x: left, y, direction: 'D' });
      map[y][x] = 'D';
    }
  } else if (location === '7') {
    const down = y + 1;
    const left = x - 1;

    if (!visited[`${x},${down}`]) {
      next.push({ x, y: down, direction: 'D' });
      map[y][x] = 'D';
    } else {
      next.push({ x: left, y, direction: 'U' });
      map[y][x] = 'U';
    }
  } else if (location === 'F') {
    const down = y + 1;
    const right = x + 1;

    if (!visited[`${x},${down}`]) {
      next.push({ x, y: down, direction: 'D' });
      map[y][x] = 'D';
    } else {
      next.push({ x: right, y, direction: 'U'});
      map[y][x] = 'U';
    }
  }

  next.forEach(loadPaths);
  return;
};

loadPaths(start);

let totalCount = 0;

for (let y = 0; y < map.length; y++) {
  let counting = false;
  let direction = null;
  let possible = [];
  for (let x = 0; x < map[y].length; x++) {
    char = map[y][x];
    if (counting && !(char === 'U' || char === 'D')) {
      possible.push(`${x},${y}`);
    }

    if (direction === null && (char === 'U' || char === 'D')) {
      direction = char;
      counting = true;
    } else if (direction === 'U' && char === 'D') {
      direction = null;
      totalCount += possible.length;
      counting = false;

      possible.forEach(key => {
        const [x, y] = key.split(',');
        map[y][x] = 'X';
      });

      possible = [];
    } else if (direction === 'D' && char === 'U') {
      direction = null;
      totalCount += possible.length;
      counting = false;
      possible.forEach(key => {
        const [x, y] = key.split(',');
        map[y][x] = 'X';
      });
      possible = [];
    }
  }
}

console.log(map.map(line => line.join('')).join('\n'));
console.log(totalCount);