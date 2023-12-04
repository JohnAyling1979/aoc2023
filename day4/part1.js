/*
  Description:
*/
const fs = require('fs');

const lines = fs.readFileSync('./data', 'utf8').split('\n');

const results = lines.reduce((acc, line) => {
  const [card, numbers] = line.split(': ');
  const [winingString, gameString] = numbers.split(' | ');

  const winingNumbers = winingString.split(' ').filter((n) => n !== '');
  const gameNumbers = gameString.split(' ').filter((n) => n !== '');

  const matches = gameNumbers.filter((n) => winingNumbers.includes(n));

  acc[card] = 0;

  if (matches.length > 0) {
    acc[card] = 1;
    matches.pop();
  }

  matches.forEach((match) => {
    acc[card] *= 2;
  });

  return acc;
}, {});

console.log(Object.values(results).reduce((acc, value) => acc + value, 0));
