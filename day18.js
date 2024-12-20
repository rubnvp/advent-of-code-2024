import { readFileSync } from 'fs';
console.time('✨ Done in');
console.log('--- Day18 ---');

let inputText = /* test input */`
5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0
`;
inputText = readFileSync('./inputs/day18.txt', { encoding: 'utf8' }); // use input from file
const MATRIX_SIZE = 71;
const FALLEN_BYTES = 1024;

// const MATRIX_SIZE = 7;
// const FALLEN_BYTES = 12;

function parseInput(inputText) {
  const matrix = Array.from({ length: MATRIX_SIZE }, () => Array(MATRIX_SIZE).fill('.'));
  const coordinates = inputText.trim()
    .split('\n')
    .map(line => line.split(',').map(Number));
  coordinates
    .slice(0, FALLEN_BYTES)
    .forEach(([x, y]) => matrix[y][x] = '#');
  return { matrix, coordinates };
}

function solve1({ matrix }) {
  matrix = JSON.parse(JSON.stringify(matrix));
  const END = MATRIX_SIZE - 1;
  let steps = [[0, 0, 0]]; // x, y, count
  let minPathLength = null;
  matrix[0][0] = '*';
  while (steps.length > 0) {
    let nextSteps = [];
    for (const [x, y, count] of steps) {
      if (x === END && y === END) {
        minPathLength = count;
        nextSteps = [];
        break;
      }
      if (matrix[y - 1]?.[x] === '.') {
        matrix[y - 1][x] = '*';
        nextSteps.push([x, y - 1, count + 1]);
      }
      if (matrix[y + 1]?.[x] === '.') {
        matrix[y + 1][x] = '*';
        nextSteps.push([x, y + 1, count + 1]);
      }
      if (matrix[y][x - 1] === '.') {
        matrix[y][x - 1] = '*';
        nextSteps.push([x - 1, y, count + 1]);
      }
      if (matrix[y][x + 1] === '.') {
        matrix[y][x + 1] = '*';
        nextSteps.push([x + 1, y, count + 1]);
      }
    }
    steps = nextSteps;
  }
  return minPathLength;
}

function solve2({ matrix, coordinates }) {
  for (let i = FALLEN_BYTES; i < coordinates.length; i++) {
    const [x, y] = coordinates[i];
    matrix[y][x] = '#';
    if (solve1({ matrix }) === null) {
      return `${x},${y}`;
    }
  }
  return null;
}

const input = parseInput(inputText);
console.log('Solution 1:', solve1(input));
console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');