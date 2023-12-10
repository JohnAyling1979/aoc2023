/*
*/
const fs = require('fs');

let start;
const visited = {};

const map = fs.readFileSync('./data', 'utf8').split('\n').map((line, yIndex) => line.split('').map((char, xIndex) => {
  if (char === 'S') {
    start = { x: xIndex, y: yIndex, direction: '^' };
  }

  return char;
}));

function floodFill(x, y) {
  const directions = ['^', '>', 'v', '<'];

  if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) {
    return;
  }

  const location = map[y][x];

  if (directions.includes(location) || location === 'O') {
    return;
  }

  map[y][x] = 'O';
  const up = y - 1;
  const down = y + 1;
  const left = x - 1;
  const right = x + 1;

  floodFill(x, up);
  floodFill(x, down);
  floodFill(left, y);
  floodFill(right, y);
}

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

    next.push({ x, y: up, direction: '^' });
    map[y][x] = '^';
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

    if (!visited[`${left},${y}`]) {
      next.push({ x: left, y, direction: '<' });
      map[y][x] = '<';
    } else {
      next.push({ x: right, y, direction: '>' });
      map[y][x] = '>';
    }
  } else if (location === 'L') {
    const up = y - 1;
    const right = x + 1;

    if (!visited[`${x},${up}`]) {
      next.push({ x, y: up, direction: '^' });
      map[y][x] = '^';
    } else {
      next.push({ x: right, y, direction: '>' });
      map[y][x] = '>';
    }
  } else if (location === 'J') {
    const up = y - 1;
    const left = x - 1;

    if (!visited[`${x},${up}`]) {
      next.push({ x, y: up, direction: '^' });
      map[y][x] = '^';
    } else {
      next.push({ x: left, y, direction: '<' });
      map[y][x] = '<';
    }
  } else if (location === '7') {
    const down = y + 1;
    const left = x - 1;

    if (!visited[`${x},${down}`]) {
      next.push({ x, y: down, direction: 'v' });
      map[y][x] = 'v';
    } else {
      next.push({ x: left, y, direction: '<' });
      map[y][x] = '<';
    }
  } else if (location === 'F') {
    const down = y + 1;
    const right = x + 1;

    if (!visited[`${x},${down}`]) {
      next.push({ x, y: down, direction: 'v' });
      map[y][x] = 'v';
    } else {
      next.push({ x: right, y, direction: '>'});
      map[y][x] = '>';
    }
  }

  next.forEach(loadPaths);
  return;
};

loadPaths(start);

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (y === 0 || y === map.length - 1 || x === 0 || x === map[y].length - 1) {
      floodFill(x, y);
    }
  }
}

let totalCount = 0;

for (let y = 0; y < map.length; y++) {
  const directionStack = [];
  let possible = []
  for (let x = 0; x < map[y].length; x++) {
    char = map[y][x];

    if (char === '^' || char === 'v') {
      if (directionStack.length === 0) {
        directionStack.push(char);
        continue;
      } else {
        const lastDirection = directionStack[directionStack.length - 1];

        if (lastDirection !== char) {
          totalCount += possible.length;

          possible.forEach(({ x, y }) => {
            map[y][x] = 'I';
          });
          possible = [];
          directionStack.pop();
        }
      }
    } else if (char === '<' || char === '>' || char === 'O') {
      // do nothing
    } else {
      if (directionStack.length > 0) {
        possible.push({ x, y });
      }
    }
  }
}

console.log(map.map(line => line.join('')).join('\n'));
console.log(totalCount);