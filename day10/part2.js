/*
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

const originalMap = map.map(line => line.map(char => char));

function loadPaths(node) {
  const { x, y, step } = node;
  const next = [];

  if (visited[`${x},${y}`]) {
    return;
  }

  visited[`${x},${y}`] = true;

  const location = map[y][x];

  if (location === 'S') {
    const up = y - 1;
    const down = y + 1;
    const left = x - 1;
    const right = x + 1;

    if (up >= 0 && map[up][x] !== '.') {
      next.push({ x, y: up, step: step + 1 });
    }

    if (down < map.length && map[down][x] !== '.') {
      next.push({ x, y: down, step: step + 1 });
    }

    if (left >= 0 && map[y][left] !== '.') {
      next.push({ x: left, y, step: step + 1 });
    }

    if (right < map[y].length && map[y][right] !== '.') {
      next.push({ x: right, y, step: step + 1 });
    }
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

  map[y][x] = 'X';

  next.forEach(loadPaths);
  return;
};

function floodFill(x, y) {
  if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) {
    return;
  }

  const location = map[y][x];

  if (location === 'X' || location === 'O') {
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

loadPaths(start);

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (y === 0 || y === map.length - 1 || x === 0 || x === map[y].length - 1) {
      floodFill(x, y);
    }
  }
}
let count = 0;
map.forEach((line, y) => line.forEach((char, x) => {
  if (char === 'X' || char === 'O') {
    if (char === 'X') {
      map[y][x] = originalMap[y][x];
    }
    return;
  }

  count++;
  map[y][x] = '#';
}));

console.log(map.map(line => line.join('')).join('\n'));
console.log(count);
