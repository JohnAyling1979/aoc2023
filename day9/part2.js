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

    if (hi === 0) {
      h.unshift(0);
    } else {
      const first = h[0];

      const prev = history[hi - 1];

      const prevFirst = prev[0];

      const newValue = first - prevFirst;

      if (hi === history.length - 1) {
        answer += newValue;
      }

      h.unshift(newValue);
    }
  });
});

console.log(answer);
