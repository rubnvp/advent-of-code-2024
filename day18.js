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
// inputText = readFileSync('./inputs/day18.txt', { encoding: 'utf8' }); // use input from file

// const MATRIX_SIZE = 71;
// const FALLEN_BYTES = 1024;
const MATRIX_SIZE = 7;
const FALLEN_BYTES = 12;

function parseInput(inputText) {
  const matrix = Array.from({ length: MATRIX_SIZE }, () => Array(MATRIX_SIZE).fill('.'));
  const coordinates = inputText.trim()
    .split('\n')
    .map(line => line.split(',').map(Number))
    .slice(0, FALLEN_BYTES);
  coordinates.forEach(([x, y]) => matrix[y][x] = '#');
  return matrix;
}

function solve1(matrix) {
  const END = MATRIX_SIZE - 1;

  let minPathLength = Infinity;
  const stack = [[0, 0, []]];

  while (stack.length > 0) {
    const [x, y, path] = stack.pop();
    path.push(`${x},${y}`);

    if (path.length >= minPathLength) continue;
    if (x === END && y === END) {
      minPathLength = Math.min(minPathLength, path.length);
      console.log('New min path length:', minPathLength);
      continue;
    }

    if (matrix[y - 1]?.[x] === '.' && !path.includes(`${x},${y - 1}`)) stack.push([x, y - 1, [...path]]);
    if (matrix[y + 1]?.[x] === '.' && !path.includes(`${x},${y + 1}`)) stack.push([x, y + 1, [...path]]);
    if (matrix[y][x - 1] === '.' && !path.includes(`${x - 1},${y}`)) stack.push([x - 1, y, [...path]]);
    if (matrix[y][x + 1] === '.' && !path.includes(`${x + 1},${y}`)) stack.push([x + 1, y, [...path]]);
  }

  return minPathLength - 1;
}

function solve2(input) {
  return input;
}

const input = parseInput(inputText);
console.log('Solution 1:', solve1(input));
// console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');