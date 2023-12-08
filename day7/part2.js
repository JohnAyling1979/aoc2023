/*
  Description:
*/
const fs = require('fs');

const lines = fs.readFileSync('./data', 'utf8').split('\n');

const cardMap = {
  A: 14,
  K: 13,
  Q: 12,
  J: 0,
  T: 10,
}

function getHandRank(cards) {
  let rank = 0;

  const cardSets = cards.reduce((group, card) => {
    if (!group[card]) {
      group[card] = 1;
    } else {
      group[card]++;
    }

    return group;
  }, {});

  if (cardSets['J']) {
    let highestSet = '';

    Object.keys(cardSets).forEach(card => {
      if (card === 'J') {
        return;
      }

      if (highestSet === '') {
        highestSet = card;
      } else {
        if (cardSets[card] > cardSets[highestSet]) {
          highestSet = card;
        }
      }
    });

    if (highestSet !== '') {
      cardSets[highestSet] += cardSets['J'];
      cardSets['J'] = 0;
    }
  }

  const frequency = Object.values(cardSets).sort().reverse();

  if (frequency[0] === 5) {
    rank = 6;
  } else if (frequency[0] === 4) {
    rank = 5;
  } else if (frequency[0] === 3 && frequency[1] === 2) {
    rank = 4;
  } else if (frequency[0] === 3) {
    rank = 3;
  } else if (frequency[0] === 2 && frequency[1] === 2) {
    rank = 2;
  } else if (frequency[0] === 2) {
    rank = 1;
  }

  return rank;
}

lines.sort((one, two) => {
  const [hand1] = one.split(' ');
  const [hand2] = two.split(' ');
  const cards1 = hand1.split('');
  const cards2 = hand2.split('');

  const rank1 = getHandRank(cards1);
  const rank2 = getHandRank(cards2);

  if (rank1 !== rank2) {
    return rank1 - rank2;
  }

  for (let index = 0; index < cards1.length; index++) {
    const card1 = cardMap[cards1[index]] ?? cards1[index];
    const card2 = cardMap[cards2[index]] ?? cards2[index];

    if (card1 === card2) {
      continue;
    }

    return card1 - card2;
  }
});


console.log(lines.reduce((total, hand, index) => {
  const [_, bid] = hand.split(' ');

  return total + parseInt(bid) * (index + 1);
}, 0));