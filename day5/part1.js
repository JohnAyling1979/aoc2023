/*
  Description:
*/
const fs = require('fs');

const lines = fs.readFileSync('./data', 'utf8').split('\n');

const seedList = lines.shift();

let seeds = seedList.split('seeds: ')[1].split(' ').map(Number);

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
        seeds = seeds.map(seed => {
          const key = Object.keys(seedToSoil).find(key => {
            const [start, end] = key.split(' ').map(Number);

            return seed >= start && seed <= end;
          });
          const soil = seedToSoil[key];

          if (soil === undefined) {
            return seed;
          }

          const [start] = key.split(' ').map(Number);

          return seed - start + soil;
        });
        break;
      case 'soil-to-fertilizer map:':
        seeds = seeds.map(seed => {
          const key = Object.keys(soilToFertilizer).find(key => {
            const [start, end] = key.split(' ').map(Number);

            return seed >= start && seed <= end;
          });
          const fertilizer = soilToFertilizer[key];

          if (fertilizer === undefined) {
            return seed;
          }

          const [start] = key.split(' ').map(Number);

          return seed - start + fertilizer;
        });
        break;
      case 'fertilizer-to-water map:':
        seeds = seeds.map(seed => {
          const key = Object.keys(fertilizerToWater).find(key => {
            const [start, end] = key.split(' ').map(Number);

            return seed >= start && seed <= end;
          });
          const water = fertilizerToWater[key];

          if (water === undefined) {
            return seed;
          }

          const [start] = key.split(' ').map(Number);

          return seed - start + water;
        });
        break;
      case 'water-to-light map:':
        seeds = seeds.map(seed => {
          const key = Object.keys(waterToLight).find(key => {
            const [start, end] = key.split(' ').map(Number);

            return seed >= start && seed <= end;
          });
          const light = waterToLight[key];

          if (light === undefined) {
            return seed;
          }

          const [start] = key.split(' ').map(Number);

          return seed - start + light;
        });
        break;
      case 'light-to-temperature map:':
        seeds = seeds.map(seed => {
          const key = Object.keys(lightToTemperature).find(key => {
            const [start, end] = key.split(' ').map(Number);

            return seed >= start && seed <= end;
          });
          const temperature = lightToTemperature[key];

          if (temperature === undefined) {
            return seed;
          }

          const [start] = key.split(' ').map(Number);

          return seed - start + temperature;
        });
        break;
      case 'temperature-to-humidity map:':
        seeds = seeds.map(seed => {
          const key = Object.keys(temperatureToHumidity).find(key => {
            const [start, end] = key.split(' ').map(Number);

            return seed >= start && seed <= end;
          });
          const humidity = temperatureToHumidity[key];

          if (humidity === undefined) {
            return seed;
          }

          const [start] = key.split(' ').map(Number);

          return seed - start + humidity;
        });
        break;
    }

    step = line;

    return;
  }

  switch (step) {
    case 'seed-to-soil map:':
      const [soilOut, seedIn, soilRange] = line.split(' ').map(Number);

      seedToSoil[`${seedIn} ${seedIn + soilRange - 1}`] = soilOut;
      break;
    case 'soil-to-fertilizer map:':
      const [fertilizerOut, soilIn, fertilizerRange] = line.split(' ').map(Number);

      soilToFertilizer[`${soilIn} ${soilIn + fertilizerRange - 1}`] = fertilizerOut;
      break;
    case 'fertilizer-to-water map:':
      const [waterOut, fertilizerIn, waterRange] = line.split(' ').map(Number);

      fertilizerToWater[`${fertilizerIn} ${fertilizerIn + waterRange - 1}`] = waterOut;
      break;
    case 'water-to-light map:':
      const [lightOut, waterIn, lightRange] = line.split(' ').map(Number);

      waterToLight[`${waterIn} ${waterIn + lightRange - 1}`] = lightOut;
      break;
    case 'light-to-temperature map:':
      const [temperatureOut, lightIn, temperatureRange] = line.split(' ').map(Number);

      lightToTemperature[`${lightIn} ${lightIn + temperatureRange - 1}`] = temperatureOut;
      break;
    case 'temperature-to-humidity map:':
      const [humidityOut, temperatureIn, humidityRange] = line.split(' ').map(Number);

      temperatureToHumidity[`${temperatureIn} ${temperatureIn + humidityRange - 1}`] = humidityOut;
      break;
    case 'humidity-to-location map:':
      const [locationOut, humidityIn, locationRange] = line.split(' ').map(Number);

      humidityToLocation[`${humidityIn} ${humidityIn + locationRange - 1}`] = locationOut;
      break;
  }
});

seeds = seeds.map(seed => {
  const key = Object.keys(humidityToLocation).find(key => {
    const [start, end] = key.split(' ').map(Number);

    return seed >= start && seed <= end;
  });
  const location = humidityToLocation[key];

  if (location === undefined) {
    return seed;
  }

  const [start] = key.split(' ').map(Number);

  return seed - start + location;
});

console.log(Math.min(...seeds));
