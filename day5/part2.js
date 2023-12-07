/*
  Description:
*/
function getMapKeys(map, start, end) {
  return Object.keys(map).filter(key => {
    const [keyStart, keyEnd] = key.split(' ').map(Number);

    if (start >= keyStart && end <= keyEnd) {
      return true;
    } else if (start >= keyStart && start <= keyEnd) {
      return true;
    } else if (end >= keyStart && end <= keyEnd) {
      return true;
    }
  });
}

function mapKeys(keys, map, start, end) {
  return keys.map(key => {
    const [keyStart, keyEnd] = key.split(' ').map(Number);

    if (start >= keyStart && end <= keyEnd) {
      return [
        `${start + map[key]} ${end + map[key]}`,
      ];
    } else if (start >= keyStart && start <= keyEnd) {
      return [
        `${start + map[key]} ${keyEnd + map[key]}`,
        ...mapKeys(keys, map, keyEnd + 1, end),
      ];
    } else if (end >= keyStart && end <= keyEnd) {
      return [
        `${keyStart + map[key]} ${end + map[key]}`,
        ...mapKeys(keys, map, start, keyStart - 1),
      ];
    }

    return [`${start} ${end}`];
  }).flat();
}

const fs = require('fs');

const lines = fs.readFileSync('./data', 'utf8').split('\n');

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
        const soils = values.map(seed => {
          const [seedStart, seedEnd] = seed.split(' ').map(Number);

          const keys = getMapKeys(seedToSoil, seedStart, seedEnd);

          if (keys.length === 0) {
            return seed;
          }

          return mapKeys(keys, seedToSoil, seedStart, seedEnd);
        });

        values = [...new Set(soils.flat())];

        console.log('soils', values);
      break;
      case 'soil-to-fertilizer map:':
        const fertilizers = values.map(soil => {
          const [soilStart, soilEnd] = soil.split(' ').map(Number);

          const keys = getMapKeys(soilToFertilizer, soilStart, soilEnd);

          if (keys.length === 0) {
            return soil;
          }

          return mapKeys(keys, soilToFertilizer, soilStart, soilEnd);
        });

        values = [...new Set(fertilizers.flat())];

        console.log('fertilizer', values);
      break;
      case 'fertilizer-to-water map:':
        const waters = values.map(fertilizer => {
          const [fertilizerStart, fertilizerEnd] = fertilizer.split(' ').map(Number);

          const keys = getMapKeys(fertilizerToWater, fertilizerStart, fertilizerEnd);

          if (keys.length === 0) {
            return fertilizer;
          }

          return mapKeys(keys, fertilizerToWater, fertilizerStart, fertilizerEnd);
        });

        values = [...new Set(waters.flat())];

        console.log('water', values);
      break;
      case 'water-to-light map:':
        const lights = values.map(water => {
          const [waterStart, waterEnd] = water.split(' ').map(Number);

          const keys = getMapKeys(waterToLight, waterStart, waterEnd);

          if (keys.length === 0) {
            return water;
          }

          return mapKeys(keys, waterToLight, waterStart, waterEnd);
        });

        values = [...new Set(lights.flat())];

        console.log('light', values);
      break;
      case 'light-to-temperature map:':
        const temperatures = values.map(light => {
          const [lightStart, lightEnd] = light.split(' ').map(Number);

          const keys = getMapKeys(lightToTemperature, lightStart, lightEnd);

          if (keys.length === 0) {
            return light;
          }

          return mapKeys(keys, lightToTemperature, lightStart, lightEnd);
        });

        values = [...new Set(temperatures.flat())];

        console.log('temperature', values);
      break;
      case 'temperature-to-humidity map:':
        const humidities = values.map(temperature => {
          const [temperatureStart, temperatureEnd] = temperature.split(' ').map(Number);

          const keys = getMapKeys(temperatureToHumidity, temperatureStart, temperatureEnd);

          if (keys.length === 0) {
            return temperature;
          }

          return mapKeys(keys, temperatureToHumidity, temperatureStart, temperatureEnd);
        });

        values = [...new Set(humidities.flat())];

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
const locations = values.map(humidity => {
  const [humidityStart, humidityEnd] = humidity.split(' ').map(Number);

  const keys = getMapKeys(humidityToLocation, humidityStart, humidityEnd);

  if (keys.length === 0) {
    return humidity;
  }

  return mapKeys(keys, humidityToLocation, humidityStart, humidityEnd);
});

values = [...new Set(locations.flat())];

console.log('location', values);

console.log('result = ', Math.min(...values.map(pair => pair.split(' ').map(Number)).flat()));

// console.log('seedToSoil', seedToSoil);
// console.log('soilToFertilizer', soilToFertilizer);
// console.log('fertilizerToWater', fertilizerToWater);
// console.log('waterToLight', waterToLight);
// console.log('lightToTemperature', lightToTemperature);
// console.log('temperatureToHumidity', temperatureToHumidity);
// console.log('humidityToLocation', humidityToLocation);

