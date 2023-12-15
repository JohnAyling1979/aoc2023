/*
  Description:
*/
const fs = require('fs');

const codes = fs.readFileSync('./data', 'utf8').split(',');

function hash(string) {
  return string.split('').reduce((acc, curr) => {
    acc += curr.charCodeAt(0);
    acc *= 17;
    acc %= 256;

    return acc
  }, 0);
}

const total = codes.reduce((acc, curr) => {
  acc += hash(curr);

  return acc;
}, 0);

console.log(total);
