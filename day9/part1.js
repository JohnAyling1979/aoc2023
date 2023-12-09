/*
  Description:
*/
const fs = require('fs');

const lines = fs.readFileSync('./data', 'utf8').split('\n');

let answer = 0;

lines.forEach((line) => {
  const values = line.split(' ').map(Number);
  const history = [values];

  let historyIndex = 0;

  do {
    const diffs = [];

    history[historyIndex].forEach((value, index) => {
      if (history[historyIndex][index + 1] !== undefined) {
        diffs.push(history[historyIndex][index + 1] - value);
      }
    });

    history.push(diffs);
    historyIndex++;
  } while (!history[historyIndex].every((value) => value === 0));

  history.reverse();

  history.forEach((h, hi) => {
    const last = h[h.length - 1];

    if (hi === 0) {
      h.push(0);
    } else {
      const prev = history[hi - 1];
      const prevLast = prev[prev.length - 1];

      const newValue = prevLast + last;

      if (hi === history.length - 1) {
        answer += newValue;
      }

      h.push(newValue);
    }
  });
});

console.log(answer);
