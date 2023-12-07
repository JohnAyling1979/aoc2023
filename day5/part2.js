/*
  Description:
*/
// May still have issues but it works for the given input
const fs = require('fs');

const lines = fs.readFileSync('./data', 'utf8').split('\n');

function processValues(values, map) {
  const newValues = [];

  values.forEach(value => {
    const [valueStart, valueEnd] = value.split(' ').map(Number);

    const keys = getMapKeys(map, valueStart, valueEnd);
    if (keys.length === 0) {
      newValues.push(value);
    }
    console.log('keys', keys);
    const splitValues = [...new Set(splitValue(value, keys).flat())];

    console.log('splitValues', value, splitValues);
    console.log('');

    splitValues.forEach(splitValue => {
      const [splitStart, splitEnd] = splitValue.split(' ').map(Number);

      newValues.push(mapKeys(keys, map, splitStart, splitEnd));
    });
  });

  return newValues;
}

function getMapKeys(map, start, end) {
  return Object.keys(map).filter(key => {
    const [keyStart, keyEnd] = key.split(' ').map(Number);

    if (start >= keyStart && end <= keyEnd) {
      return true;
    } else if (start >= keyStart && start <= keyEnd) {
      return true;
    } else if (end >= keyStart && end <= keyEnd) {
      return true;
    } else if (start <= keyStart && end >= keyEnd) {
      return true;
    }
  });
}

function splitValue(value, keys) {
  const splitValues = [];
  const [valueStart, valueEnd] = value.split(' ').map(Number);
  keys.forEach(key => {
    const [keyStart, keyEnd] = key.split(' ').map(Number);

    if (valueStart >= keyStart && valueEnd <= keyEnd) {
      splitValues.push(`${valueStart} ${valueEnd}`);
    } else if (valueStart >= keyStart && valueStart <= keyEnd) {
      splitValues.push(`${valueStart} ${keyEnd}`);
      splitValues.push(`${keyEnd + 1} ${valueEnd}`);
    } else if (valueEnd >= keyStart && valueEnd <= keyEnd) {
      splitValues.push(`${valueStart} ${keyStart - 1}`);
      splitValues.push(`${keyStart} ${valueEnd}`);
    } else if (valueStart <= keyStart && valueEnd >= keyEnd) {
      splitValues.push(`${valueStart} ${keyStart - 1}`);
      splitValues.push(`${keyStart} ${keyEnd}`);
      splitValues.push(`${keyEnd + 1} ${valueEnd}`);
    }
  });

  return splitValues;
}

function mapKeys(keys, map, start, end) {
  const newValues = [];

  keys.forEach(key => {
    const [keyStart, keyEnd] = key.split(' ').map(Number);

    if (start >= keyStart && end <= keyEnd) {
      newValues.push(`${start + map[key]} ${end + map[key]}`);
    }
  });

  if (newValues.length === 0) {
    newValues.push(`${start} ${end}`);
  }

  return newValues[0];
}

const seedList = lines.shift();

let numbers = seedList.split('seeds: ')[1].split(' ').map(Number);

let values = [];
let pair = [];

numbers.forEach(number => {
  pair.push(number);

  if (pair.length === 2) {
    values.push(`${pair[0]} ${pair[0] + pair[1] - 1}`);

    pair = [];
  }
});

console.log('seeds', values);

let step = '';

const seedToSoil = {};
const soilToFertilizer = {};
const fertilizerToWater = {};
const waterToLight = {};
const lightToTemperature = {};
const temperatureToHumidity = {};
const humidityToLocation = {};

lines.forEach(line => {
  if (line === '') {
    return;
  }

  if (!/\d/.test(line)) {
    switch (step) {
      case 'seed-to-soil map:':
        values = processValues(values, seedToSoil);

        console.log('soils', values);
        break;
      case 'soil-to-fertilizer map:':
        values = processValues(values, soilToFertilizer);

        console.log('fertilizer', values);
        break;
      case 'fertilizer-to-water map:':
        values = processValues(values, fertilizerToWater);

        console.log('water', values);
        break;
      case 'water-to-light map:':
        values = processValues(values, waterToLight);

        console.log('light', values);
        break;
      case 'light-to-temperature map:':
        values = processValues(values, lightToTemperature);

        console.log('temperature', values);
        break;
      case 'temperature-to-humidity map:':
        values = processValues(values, temperatureToHumidity);

        console.log('humidity', values);
        break;
    }

    step = line;

    return;
  }

  switch (step) {
    case 'seed-to-soil map:':
      const [soilOut, seedIn, soilRange] = line.split(' ').map(Number);

      seedToSoil[`${seedIn} ${seedIn + soilRange - 1}`] = soilOut - seedIn;
      break;
    case 'soil-to-fertilizer map:':
      const [fertilizerOut, soilIn, fertilizerRange] = line.split(' ').map(Number);

      soilToFertilizer[`${soilIn} ${soilIn + fertilizerRange - 1}`] = fertilizerOut - soilIn;
      break;
    case 'fertilizer-to-water map:':
      const [waterOut, fertilizerIn, waterRange] = line.split(' ').map(Number);

      fertilizerToWater[`${fertilizerIn} ${fertilizerIn + waterRange - 1}`] = waterOut - fertilizerIn;
      break;
    case 'water-to-light map:':
      const [lightOut, waterIn, lightRange] = line.split(' ').map(Number);

      waterToLight[`${waterIn} ${waterIn + lightRange - 1}`] = lightOut - waterIn;
      break;
    case 'light-to-temperature map:':
      const [temperatureOut, lightIn, temperatureRange] = line.split(' ').map(Number);

      lightToTemperature[`${lightIn} ${lightIn + temperatureRange - 1}`] = temperatureOut - lightIn;
      break;
    case 'temperature-to-humidity map:':
      const [humidityOut, temperatureIn, humidityRange] = line.split(' ').map(Number);

      temperatureToHumidity[`${temperatureIn} ${temperatureIn + humidityRange - 1}`] = humidityOut - temperatureIn;
      break;
    case 'humidity-to-location map:':
      const [locationOut, humidityIn, locationRange] = line.split(' ').map(Number);

      humidityToLocation[`${humidityIn} ${humidityIn + locationRange - 1}`] = locationOut - humidityIn;
      break;
  }
});

// humidity-to-location map:
values = processValues(values, humidityToLocation);

console.log('location', values);

console.log('result = ', Math.min(...values.map(pair => pair.split(' ').map(Number)).flat()));

