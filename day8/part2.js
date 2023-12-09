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

const lines = fs.readFileSync('./test2', 'utf8').split('\n');

function getStepsToEnd(startPathInfo, instructions, stopStep) {
  if (startPathInfo.steps >= stopStep) {
    return startPathInfo;
  }

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

  return {
    currentPath,
    steps
  };
}

async function process(currentPaths, instructions) {
  let sameSteps = true;
  let stopStep = Infinity

  do {
    const promises = [];

    currentPaths.forEach((currentPath) => {
      promises.push(new Promise((resolve, reject) => {
        resolve(getStepsToEnd(currentPath, instructions, stopStep));
      }));
    });

    currentPaths = await Promise.all(promises);

    stopStep = currentPaths[0].steps;
    sameSteps = true;

    for (let i = 1; i < currentPaths.length; i++) {
      if (currentPaths[i].steps !== stopStep || currentPaths[i].currentPath[2] !== 'Z') {
        sameSteps = false;
      }

      if (currentPaths[i].steps > stopStep) {
        stopStep = currentPaths[i].steps;
      }
    }

    console.log('result: ', currentPaths);
  } while(!sameSteps);
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

process(currentPaths, instructions);
