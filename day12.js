import { readFileSync } from 'fs';
console.time('✨ Done in');
console.log('--- Day12 ---');

let inputText = /* test input */`
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`;
inputText = readFileSync('./inputs/day12.txt', {encoding:'utf8'});

function parseInput(inputText) {
  return inputText.trim()
    .split('\n')
    .map(line => line.split(''));
}

function solve1(gardenMatrix) {
  gardenMatrix = JSON.parse(JSON.stringify(gardenMatrix)); // deep copy to mute
  const regionIdCounts = {};
  for (let y = 0; y < gardenMatrix.length; y++) {
    for (let x = 0; x < gardenMatrix[y].length; x++) {
      const plant = gardenMatrix[y][x];
      if (plant.length === 1) {
        if (!regionIdCounts[plant]) regionIdCounts[plant] = 0;
        regionIdCounts[plant]++;
        const regionId = plant + regionIdCounts[plant];
        fillRecursive(y, x, regionId);
      }
    }
  }
  function fillRecursive(y, x, regionId) {
    gardenMatrix[y][x] = regionId;
    const letter = regionId[0];
    if (gardenMatrix[y][x - 1] === letter) fillRecursive(y, x - 1, regionId); // left
    if (gardenMatrix[y - 1]?.[x] === letter) fillRecursive(y - 1, x, regionId); // top
    if (gardenMatrix[y][x + 1] === letter) fillRecursive(y, x + 1, regionId); // right
    if (gardenMatrix[y + 1]?.[x] === letter) fillRecursive(y + 1, x, regionId); // bottom
  }
  const regionByPlant = {};
  for (let y = 0; y < gardenMatrix.length; y++) {
    for (let x = 0; x < gardenMatrix[y].length; x++) {
      const regionId = gardenMatrix[y][x];
      if (!regionByPlant[regionId]) regionByPlant[regionId] = {area: 0, perimeter: 0};
      const region = regionByPlant[regionId];
      region.area++;
      if (gardenMatrix[y][x - 1] !== regionId) region.perimeter++; // left
      if (gardenMatrix[y - 1]?.[x] !== regionId) region.perimeter++; // top
      if (gardenMatrix[y][x + 1] !== regionId) region.perimeter++; // right
      if (gardenMatrix[y + 1]?.[x] !== regionId) region.perimeter++; // bottom
    }
  }
  return Object.values(regionByPlant)
    .reduce((total, region) => total + (region.area * region.perimeter), 0);
}

function solve2(gardenMatrix) {
  gardenMatrix = JSON.parse(JSON.stringify(gardenMatrix)); // deep copy to mute
  const regionIdCounts = {};
  for (let y = 0; y < gardenMatrix.length; y++) {
    for (let x = 0; x < gardenMatrix[y].length; x++) {
      const plant = gardenMatrix[y][x];
      if (plant.length === 1) {
        if (!regionIdCounts[plant]) regionIdCounts[plant] = 0;
        regionIdCounts[plant]++;
        const regionId = plant + regionIdCounts[plant];
        fillRecursive(y, x, regionId);
      }
    }
  }
  function fillRecursive(y, x, regionId) {
    gardenMatrix[y][x] = regionId;
    const letter = regionId[0];
    if (gardenMatrix[y][x - 1] === letter) fillRecursive(y, x - 1, regionId); // left
    if (gardenMatrix[y - 1]?.[x] === letter) fillRecursive(y - 1, x, regionId); // top
    if (gardenMatrix[y][x + 1] === letter) fillRecursive(y, x + 1, regionId); // right
    if (gardenMatrix[y + 1]?.[x] === letter) fillRecursive(y + 1, x, regionId); // bottom
  }
  const regionByPlant = {};
  const isTopSame = (y, x) => gardenMatrix[y]?.[x] === gardenMatrix[y - 1]?.[x];
  const isBottomSame = (y, x) => gardenMatrix[y]?.[x] === gardenMatrix[y + 1]?.[x];
  const isLeftSame = (y, x) => gardenMatrix[y]?.[x] === gardenMatrix[y]?.[x - 1];
  const isRightSame = (y, x) => gardenMatrix[y]?.[x] === gardenMatrix[y]?.[x + 1];
  const isTopDifferent = (y, x) => !isTopSame(y, x);
  const isBottomDifferent = (y, x) => !isBottomSame(y, x);
  const isLeftDifferent = (y, x) => !isLeftSame(y, x);
  const isRightDifferent = (y, x) => !isRightSame(y, x);
  for (let y = 0; y < gardenMatrix.length; y++) {
    for (let x = 0; x < gardenMatrix[y].length; x++) {
      const regionId = gardenMatrix[y][x];
      if (!regionByPlant[regionId]) regionByPlant[regionId] = {area: 0, perimeter: 0};
      const region = regionByPlant[regionId];
      region.area++;
      // count interior and exterior corners
      if (isTopDifferent(y, x) && isLeftDifferent(y, x)) region.perimeter++; // interior corner top left
      if (isTopDifferent(y, x) && isRightDifferent(y, x)) region.perimeter++; // interior corner top right
      if (isBottomDifferent(y, x) && isLeftDifferent(y, x)) region.perimeter++; // interior corner bottom left
      if (isBottomDifferent(y, x) && isRightDifferent(y, x)) region.perimeter++; // interior corner bottom right
      if (isTopSame(y, x) && isLeftSame(y, x) && isTopDifferent(y, x - 1)) region.perimeter++; // exterior corner top left
      if (isTopSame(y, x) && isRightSame(y, x) && isTopDifferent(y, x + 1)) region.perimeter++; // exterior corner top right
      if (isBottomSame(y, x) && isLeftSame(y, x) && isBottomDifferent(y, x - 1)) region.perimeter++; // exterior corner bottom left
      if (isBottomSame(y, x) && isRightSame(y, x) && isBottomDifferent(y, x + 1)) region.perimeter++; // exterior corner bottom right
    }
  }
  return Object.values(regionByPlant)
    .reduce((total, region) => total + (region.area * region.perimeter), 0);
}

const input = parseInput(inputText);
console.log('Solution 1:', solve1(input));
console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');