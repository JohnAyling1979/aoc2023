/*
  The calibration value can be found by combining the first digit and the last digit (the line contains alphanumerics)
  to form a single two-digit number. Then find the sum of those 2 digits values.
*/
const fs = require('fs');

const lines = fs.readFileSync('./data', 'utf8').split('\n');

const sum = lines.reduce((sum, line) => {
  let firstDigit = null;
  let lastDigit = null;

  for (let i = 0; i < line.length; i++) {
    const character = line[i];

    if (isNaN(character)) {
      continue;
    }

    if (firstDigit === null) {
      firstDigit = character;
    } else {
      lastDigit = character;
    }
  }

  if (lastDigit === null) {
    lastDigit = firstDigit;
  }

  const value = parseInt(firstDigit + lastDigit);

  return sum + value;
}, 0);

console.log(sum);
