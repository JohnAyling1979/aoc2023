/*
  Description:

  Should work but it's too slow.

  Each individual start:
  LQA -> FBZ = 13207
  SGA -> QNZ = 22199
  AAA -> ZZZ = 14893
  BJA -> QXZ = 16579
  SVA -> LHZ = 20513
  GFA -> BRZ = 12083

  Need when all paths end at the same time
*/
const fs = require('fs');

const lines = fs.readFileSync('./data', 'utf8').split('\n');

const instructions = lines[0].split('');

lines.shift();
lines.shift();

const paths = {};

let currentPaths = [];
let ended = 0;
let instructionIndex = 0;
let steps = 0;

lines.forEach((line) => {
  const [path, options] = line.split(' = ');

  if (path[2] === 'A') {
    currentPaths.push(path);
  }

  paths[path] = options.split(', ').map((option) => option.match(/\w+/)[0])
});

while (ended !== currentPaths.length) {
  const instruction = instructions[instructionIndex];
  ended = 0;

  currentPaths.forEach((currentPath, index) => {
    if (instruction === 'L') {
      currentPaths[index] = paths[currentPath][0];
    } else if (instruction === 'R') {
      currentPaths[index] = paths[currentPath][1];
    }

    if (currentPaths[index][2] === 'Z') {
      ended++;
    }
  });

  instructionIndex++;

  if (instructionIndex === instructions.length) {
    instructionIndex = 0;
  }

  steps++;
}

console.log(steps);