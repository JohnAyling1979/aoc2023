/*
  Description:
*/
const fs = require('fs');

const [time, distance] = fs.readFileSync('./data', 'utf8').split('\n');

const [_th, ...times] = time.split(/\s+/);
const [_dh, ...distances] = distance.split(/\s+/);

const wins = {};

times.forEach((time, index) => {
  wins[time] = 0;

  for(let hold = 1; hold < time; hold++) {
    const distance = (time - hold) * hold;

    if (distance > distances[index]) {
      wins[time]++;
    }
  }
});

console.log(Object.values(wins).reduce((total, value) => value * total, 1));