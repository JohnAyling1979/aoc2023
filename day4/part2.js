/*
  Description:
*/
const fs = require('fs');

const lines = fs.readFileSync('./data', 'utf8').split('\n');

const results = lines.reduce((acc, line) => {
  const [card, numbers] = line.split(': ');
  console.log(card);
  const cardNumber = parseInt(card.match(/\d+/)[0]);
  const [winingString, gameString] = numbers.split(' | ');

  const winingNumbers = winingString.split(' ').filter((n) => n !== '');
  const gameNumbers = gameString.split(' ').filter((n) => n !== '');

  const matches = gameNumbers.filter((n) => winingNumbers.includes(n));
  console.log(line)
  console.log(cardNumber, matches);
  if (!acc[cardNumber]) {
    acc[cardNumber] = 1;
  } else {
    acc[cardNumber] += 1;
  }

    let winningCard = cardNumber + 1;

    matches.forEach((match) => {
      if (!acc[winningCard]) {
        acc[winningCard] = 1 * acc[cardNumber];
      } else {
        acc[winningCard] += 1 * acc[cardNumber];
      }

      winningCard++;
    });

  return acc;
}, {});

console.log(results);
console.log(Object.values(results).reduce((acc, value) => acc + value, 0));
