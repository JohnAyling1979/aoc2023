/*
  The calibration value can be found by combining the first digit and the last digit (the line contains alphanumerics)
  to form a single two-digit number. Then find the sum of those 2 digits values.

  In part 2 those digits can be spelled out in words.
*/
const fs = require('fs');

const lines = fs.readFileSync('./data', 'utf8').split('\n');

const sum = lines.reduce((sum, line) => {
  let firstDigit = null;
  let lastDigit = null;

  for (let i = 0; i < line.length; i++) {
    let character = line[i];

    if (isNaN(character)) {
      let number = null;

      if (character === 'o' && line.substring(i, i + 3) === 'one') {
        number = '1';
      } else if (character === 't' && line.substring(i, i + 3) === 'two') {
        number = '2';
      } else if (character === 't' && line.substring(i, i + 5) === 'three') {
        number = '3';
      } else if (character === 'f' && line.substring(i, i + 4) === 'four') {
        number = '4';
      } else if (character === 'f' && line.substring(i, i + 4) === 'five') {
        number = '5';
      } else if (character === 's' && line.substring(i, i + 3) === 'six') {
        number = '6';
      } else if (character === 's' && line.substring(i, i + 5) === 'seven') {
        number = '7';
      } else if (character === 'e' && line.substring(i, i + 5) === 'eight') {
        number = '8';
      } else if (character === 'n' && line.substring(i, i + 4) === 'nine') {
        number = '9';
      }

      if (number === null) {
        continue;
      }

      character = number;
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
