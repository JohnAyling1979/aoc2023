/*
  Part 2 is a lowest common multiplier problem.

  The Part 2 solution should find the correct answer but time is an issue.
  It's currently been running in the background for 44 minutes.
*/

const fs = require('fs');

const lines = fs.readFileSync('./data', 'utf8').split('\n');

function gcd(a, b) {
  if (b === 0) {
      return a;
  } else {
      return gcd(b, a % b);
  }
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function calculateLCM(numbers) {
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
      result = lcm(result, numbers[i]);
  }
  return result;
}

function getStepsToEnd(startPathInfo, instructions) {
  let steps = startPathInfo.steps;
  let currentPath = startPathInfo.currentPath;

  do {
    const instructionIndex = steps % instructions.length;
    const instruction = instructions[instructionIndex] ;

    if (instruction === 'L') {
      currentPath = paths[currentPath][0];
    } else if (instruction === 'R') {
      currentPath = paths[currentPath][1];
    }

    steps++;
  } while(currentPath[2] !== 'Z')

  return steps;
}

const instructions = lines[0].split('');

lines.shift();
lines.shift();

const paths = {};

let currentPaths = [];

lines.forEach((line) => {
  const [path, options] = line.split(' = ');

  if (path[2] === 'A') {
    currentPaths.push({ currentPath: path, steps: 0 });
  }

  paths[path] = options.split(', ').map((option) => option.match(/\w+/)[0])
});

const steps = currentPaths.map((currentPath) => {
  return getStepsToEnd(currentPath, instructions);
});

console.log(calculateLCM(steps));
