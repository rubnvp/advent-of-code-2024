import { readFileSync } from 'fs';
import { type } from 'os';
const DAY = '08';
console.time('✨ Done in');
console.log(`--- Day${DAY} ---`);

const inputText = true // use input from .txt
  ? readFileSync(`./inputs/day${DAY}.txt`, {encoding:'utf8'})
  : /* test input */`
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`;

function parseInput(inputText) {
  const grid = inputText.trim()
    .split('\n')
    .map(line => line.split(''));
  const antennas = grid
    .reduce((antennas, line, y) => {
      line.forEach((cell, x) => {
        if (cell !== '.') antennas.push({ type: cell, y, x });
      });
      return antennas;
    }, []);
  return {
    antennas,
    height: grid.length,
    width: grid[0].length,
  }
}

function solve1({ antennas, height, width }) {
  const antennaTypes = Array.from(new Set(antennas.map(({ type }) => type)));
  const antiNodes = antennaTypes
    .reduce((antiNodes, type) => {
      const typeAntennas = antennas
        .filter(antenna => antenna.type === type);
      typeAntennas
        .forEach((antennaA, i) => {
          typeAntennas.forEach((antennaB, j) => {
            if (i === j) return;
            const { posY, posX } = { // antiNode position
              posY: antennaA.y + 2*(antennaB.y - antennaA.y),
              posX: antennaA.x + 2*(antennaB.x - antennaA.x),
            };
            if (0 <= posY && posY < height && 0 <= posX && posX < width) { // if is in the grid
              antiNodes.add(`${posY},${posX}`);
            }
          });
        });
      return antiNodes;
    }, new Set());
  return antiNodes.size;
}

function solve2({ antennas, height, width }) {
  const antennaTypes = Array.from(new Set(antennas.map(({ type }) => type)));
  const antiNodes = antennaTypes
    .reduce((antiNodes, type) => {
      const typeAntennas = antennas
        .filter(antenna => antenna.type === type);
      typeAntennas
        .forEach((antennaA, i) => {
          typeAntennas.forEach((antennaB, j) => {
            if (i === j) return;
            let iteration = 1;
            let posY = antennaA.y + 1 * (antennaB.y - antennaA.y);
            let posX = antennaA.x + 1 * (antennaB.x - antennaA.x);
            while (0 <= posY && posY < height && 0 <= posX && posX < width) { // if is in the grid
              antiNodes.add(`${posY},${posX}`);
              iteration++;
              posY = antennaA.y + iteration * (antennaB.y - antennaA.y);
              posX = antennaA.x + iteration * (antennaB.x - antennaA.x);
            }
          });
        });
      return antiNodes;
    }, new Set());
  return antiNodes.size;
}

const input = parseInput(inputText);
console.log('Solution 1:', solve1(input));
console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');