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

const boxes = codes.reduce((acc, sequence) => {
  if (sequence.indexOf('=') > -1) {
    const [label, value] = sequence.split('=');
    const box = hash(label);

    if (!acc[box]) {
      acc[box] = [];
    }

    const labelIndex = acc[box].findIndex((item) => item.label === label);

    if (labelIndex > -1) {
      acc[box][labelIndex].value = parseInt(value, 10);
    } else {
      acc[box].push({ label, value: parseInt(value, 10) });
    }
  } else if (sequence.indexOf('-') > -1) {
    const label = sequence.substring(0, sequence.indexOf('-'));
    const box = hash(label);

    if (!acc[box]) {
      acc[box] = [];
    }

    const labelIndex = acc[box].findIndex((item) => item.label === label);

    if (labelIndex > -1) {
      acc[box].splice(labelIndex, 1);
    }
  }

  return acc;
}, {});

console.log(Object.keys(boxes).reduce((acc, boxNumber) => {
  const box = boxes[boxNumber];

  return acc + box.reduce((acc, item, slotNumber) => {
    const boxValue = parseInt(boxNumber, 10) + 1;
    const slotValue = slotNumber + 1;

    return acc + boxValue * slotValue * item.value;
  }, 0);
}, 0));
