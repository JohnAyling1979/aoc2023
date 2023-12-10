/*
  Needed to increase the stack size to run this one: node --stack-size=8192 part1.js
*/
const fs = require('fs');

let start;
visited = {};

const map = fs.readFileSync('./data', 'utf8').split('\n').map((line, yIndex) => line.split('').map((char, xIndex) => {
  if (char === 'S') {
    start = { x: xIndex, y: yIndex, step: 0 };
  }

  return char;
}));

function loadPaths(node) {
  const { x, y, step } = node;
  const next = [];

  if (visited[`${x},${y}`]) {
    if (start.x === x && start.y === y) {
      console.log('A start: ', step / 2);
    }
    return;
  }

  visited[`${x},${y}`] = true;

  const location = map[y][x];

  if (location === 'S') {
    const up = y - 1;

    next.push({ x, y: up, step: step + 1 });
  } else if (location === '|') {
    const up = y - 1;
    const down = y + 1;

    if (up >= 0 && map[up][x] !== '.') {
      next.push({ x, y: up, step: step + 1 });
    }

    if (down < map.length && map[down][x] !== '.') {
      next.push({ x, y: down, step: step + 1 });
    }
  } else if (location === '-') {
    const left = x - 1;
    const right = x + 1;

    if (left >= 0 && map[y][left] !== '.') {
      next.push({ x: left, y, step: step + 1 });
    }

    if (right < map[y].length && map[y][right] !== '.') {
      next.push({ x: right, y, step: step + 1 });
    }
  } else if (location === 'L') {
    const up = y - 1;
    const right = x + 1;

    if (up >= 0 && map[up][x] !== '.') {
      next.push({ x, y: up, step: step + 1 });
    }

    if (right < map[y].length && map[y][right] !== '.') {
      next.push({ x: right, y, step: step + 1 });
    }
  } else if (location === 'J') {
    const up = y - 1;
    const left = x - 1;

    if (up >= 0 && map[up][x] !== '.') {
      next.push({ x, y: up, step: step + 1 });
    }

    if (left >= 0 && map[y][left] !== '.') {
      next.push({ x: left, y, step: step + 1 });
    }
  } else if (location === '7') {
    const down = y + 1;
    const left = x - 1;

    if (down < map.length && map[down][x] !== '.') {
      next.push({ x, y: down, step: step + 1 });
    }

    if (left >= 0 && map[y][left] !== '.') {
      next.push({ x: left, y, step: step + 1 });
    }
  } else if (location === 'F') {
    const down = y + 1;
    const right = x + 1;

    if (down < map.length && map[down][x] !== '.') {
      next.push({ x, y: down, step: step + 1 });
    }

    if (right < map[y].length && map[y][right] !== '.') {
      next.push({ x: right, y, step: step + 1 });
    }
  }

  next.forEach(loadPaths);
  return;
};

loadPaths(start);
