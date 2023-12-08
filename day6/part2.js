/*
  Description:
*/
const fs = require("fs");

const [timeLine, distanceLine] = fs.readFileSync("./data2", "utf8").split("\n");

const [_th, time] = timeLine.split(/\s+/);
const [_dh, distance] = distanceLine.split(/\s+/);

let wins = 0;

for (let hold = 1; hold < time; hold++) {
  const foundDistance = (time - hold) * hold;

  if (foundDistance > distance) {
    wins++;
  }
}

console.log(wins);
