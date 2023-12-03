/*
  Description: Calculate the sum of the gear ratios. These would be any 2 numbers adjacent to a *. Find the ratio by multiplying the 2 numbers together.

  Extra test case makes total = 967835
*/
const fs = require('fs');

const schematic = fs.readFileSync('./test2', 'utf8').split('\n');

const numberLocation = schematic.reduce((acc, row, rowIndex) => {
  for (let lineIndex = 0; lineIndex < row.length; lineIndex++) {
    let number = row[lineIndex];

    if (isNaN(number)) {
      continue;
    }

    let startIndex = lineIndex;
    while (row[lineIndex + 1] && !isNaN(row[lineIndex + 1])) {
      lineIndex++;
      number += row[lineIndex];
    }

    let endIndex = lineIndex;

    acc.push({
      number: parseInt(number),
      rowIndex,
      startIndex,
      endIndex,
    });
  }

  return acc;
}, []);

const sum = schematic.reduce((acc, row, rowIndex) => {
  for (let lineIndex = 0; lineIndex < row.length; lineIndex++) {
    if (row[lineIndex] !== '*') {
      continue;
    }

    const numbersInPreviousRow = numberLocation.filter((number) => {
      return number.rowIndex === rowIndex - 1 && (
        lineIndex - 1 >= number.startIndex && lineIndex - 1 <= number.endIndex ||
        lineIndex + 1 >= number.startIndex && lineIndex + 1 <= number.endIndex ||
        lineIndex >= number.startIndex && lineIndex <= number.endIndex
      );
    });
    const numbersInRow = numberLocation.filter((number) => {
      return number.rowIndex === rowIndex && (number.startIndex === lineIndex + 1 || number.endIndex === lineIndex - 1);
    });
    const numbersInNextRow = numberLocation.filter((number) => {
      return number.rowIndex === rowIndex + 1 && (
        lineIndex - 1 >= number.startIndex && lineIndex - 1 <= number.endIndex ||
        lineIndex + 1 >= number.startIndex && lineIndex + 1 <= number.endIndex ||
        lineIndex >= number.startIndex && lineIndex <= number.endIndex
      );
    });

    const mergedNumbers = numbersInPreviousRow.concat(numbersInRow).concat(numbersInNextRow);

    if (mergedNumbers.length === 2) {
      acc += mergedNumbers[0].number * mergedNumbers[1].number;
    }
  }

  return acc;
}, 0);

console.log(sum);