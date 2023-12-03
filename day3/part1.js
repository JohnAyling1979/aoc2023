/*
  Description: Calculate the sum of the part numbers. The part numbers are any number adjacent to an symbol.
*/
const fs = require('fs');

const schematic = fs.readFileSync('./data', 'utf8').split('\n');

const symbolRegex = /[^\w\s.]/g;

function getNumber(line, lineIndex) {
  let number = line[lineIndex];
  let startIndex = lineIndex;

  while (line[lineIndex + 1] && !isNaN(line[lineIndex + 1])) {
    lineIndex++;
    number += line[lineIndex];
  }

  let endIndex = lineIndex + 1;

  if (startIndex > 0) {
    startIndex -= 1;
  }

  if (endIndex < line.length -1) {
    endIndex += 1;
  }

  return {
    value: parseInt(number),
    startIndex,
    endIndex,
    lineIndex
  };
}

const sum = schematic.reduce((rowAcc, row, rowIndex) => {
  for (let lineIndex = 0; lineIndex < row.length; lineIndex++) {
    if (isNaN(row[lineIndex])) {
      continue;
    }

    const numberInfo = getNumber(row, lineIndex);

    lineIndex = numberInfo.lineIndex;

    let isPart = false;

    if (rowIndex > 0) {
      const previousRow = schematic[rowIndex - 1];

      if (previousRow.substring(numberInfo.startIndex, numberInfo.endIndex).match(symbolRegex)) {
        isPart = true;
      }
    }

    if (!isPart) {
      if (row.substring(numberInfo.startIndex, numberInfo.endIndex).match(symbolRegex)) {
        isPart = true;
      }
    }

    if (rowIndex < schematic.length - 1 && !isPart) {
      const nextRow = schematic[rowIndex + 1];

      if (nextRow.substring(numberInfo.startIndex, numberInfo.endIndex).match(symbolRegex)) {
        isPart = true;
      }
    }

    if (isPart) {
      rowAcc += numberInfo.value;
    }
  }

  return rowAcc;
}, 0);

console.log(sum);
