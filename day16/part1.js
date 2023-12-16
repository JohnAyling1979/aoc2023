/*
  Description:
*/
const fs = require('fs');

const map = fs.readFileSync('./data', 'utf8').split('\n').map((row) => {
  return row.split('').map(location => {
    return {
      location,
      energized: false,
      direction: [],
    }
  });
});

const light = {
  location: {
    x: 0,
    y: 0
  },
  direction: 'R',
  distance: 0,
};

function moveLight(light) {
  // left the map
  if (light.location.x < 0 || light.location.x >= map[0].length || light.location.y < 0 || light.location.y >= map.length) {
    return;
  }

  const mapLocation = map[light.location.y][light.location.x];

  // in cycle
  if (mapLocation.energized && mapLocation.direction.includes(light.direction)) {
    return;
  }

  mapLocation.energized = true;
  mapLocation.direction.push(light.direction);

  light.distance++;

  if (mapLocation.location === '|' && (light.direction === 'R' || light.direction === 'L')) {
    moveLight({
      location: {
        x: light.location.x,
        y: light.location.y - 1
      },
      direction: 'U',
      distance: light.distance
    });
    moveLight({
      location: {
        x: light.location.x,
        y: light.location.y + 1
      },
      direction: 'D',
      distance: light.distance
    });
  } else if (mapLocation.location === '-' && (light.direction === 'U' || light.direction === 'D')) {
    moveLight({
      location: {
        x: light.location.x + 1,
        y: light.location.y
      },
      direction: 'R',
      distance: light.distance
    });
    moveLight({
      location: {
        x: light.location.x - 1,
        y: light.location.y
      },
      direction: 'L',
      distance: light.distance
    });
  } else if (mapLocation.location === '\\') {
    if (light.direction === 'R') {
      moveLight({
        location: {
          x: light.location.x,
          y: light.location.y + 1
        },
        direction: 'D',
        distance: light.distance
      });
    } else if (light.direction === 'L') {
      moveLight({
        location: {
          x: light.location.x,
          y: light.location.y - 1
        },
        direction: 'U',
        distance: light.distance
      });
    } else if (light.direction === 'U') {
      moveLight({
        location: {
          x: light.location.x - 1,
          y: light.location.y
        },
        direction: 'L',
        distance: light.distance
      });
    } else if (light.direction === 'D') {
      moveLight({
        location: {
          x: light.location.x + 1,
          y: light.location.y
        },
        direction: 'R',
        distance: light.distance
      });
    }
  } else if (mapLocation.location === '/') {
    if (light.direction === 'R') {
      moveLight({
        location: {
          x: light.location.x,
          y: light.location.y - 1
        },
        direction: 'U',
        distance: light.distance
      });
    } else if (light.direction === 'L') {
      moveLight({
        location: {
          x: light.location.x,
          y: light.location.y + 1
        },
        direction: 'D',
        distance: light.distance
      });
    } else if (light.direction === 'U') {
      moveLight({
        location: {
          x: light.location.x + 1,
          y: light.location.y
        },
        direction: 'R',
        distance: light.distance
      });
    } else if (light.direction === 'D') {
      moveLight({
        location: {
          x: light.location.x - 1,
          y: light.location.y
        },
        direction: 'L',
        distance: light.distance
      });
    }
  } else {
    switch (light.direction) {
      case 'R':
        light.location.x++;
        break;
      case 'L':
        light.location.x--;
        break;
      case 'U':
        light.location.y--;
        break;
      case 'D':
        light.location.y++;
        break;
    }

    moveLight({
      location: {
        x: light.location.x,
        y: light.location.y
      },
      direction: light.direction,
      distance: light.distance
    });
  }
}

let total = 0;

moveLight(light);

console.log(map.map(row => row.map(location => {
  if (location.energized) {
    total++;
  }
  return location.energized ? '#' : location.location
}).join('')).join('\n'));
console.log('');
console.log(total);