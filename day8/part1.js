/*
  Description:
*/
const { match } = require('assert');
const fs = require('fs');

const lines = fs.readFileSync('./data', 'utf8').split('\n');

const instructions = lines[0].split('');

lines.shift();
lines.shift();

const paths = {};

let currentPath = 'AAA';
let instructionIndex = 0;
let steps = 0;

lines.forEach((line) => {
  const [path, options] = line.split(' = ');

  paths[path] = options.split(', ').map((option) => option.match(/\w+/)[0])
});

while (currentPath !== 'ZZZ') {
  const instruction = instructions[instructionIndex];

  if (instruction === 'L') {
    currentPath = paths[currentPath][0];
  } else if (instruction === 'R') {
    currentPath = paths[currentPath][1];
  }

  instructionIndex++;

  if (instructionIndex === instructions.length) {
    instructionIndex = 0;
  }

  steps++;
}

console.log(steps);