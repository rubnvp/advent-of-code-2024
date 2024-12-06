import { readFileSync } from 'fs';
const DAY = '06';
console.time('✨ Done in');
console.log(`--- Day${DAY} ---`);

const inputText = true // use input from .txt
  ? readFileSync(`./inputs/day${DAY}.txt`, {encoding:'utf8'})
  : /* test input */`
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`;

function parseInput(inputText) {
  return inputText.trim()
    .split('\n')
    .map(line => line.split(''));
}

function solve1(matrix) {
  matrix = matrix.map(row => [...row]); // copy the matrix
  const loc = { x: 0, y: 0 }; // location
  const dir = { x: 0, y: -1 }; // direction
  matrix.find((row, y) => row.find((cell, x) => {
    if (cell === '^') {
      loc.x = x;
      loc.y = y;
      return true;
    }
  }));
  const walkedCells = new Set();
  while (true) {
    const walkedCell = `${loc.x},${loc.y},${dir.x},${dir.y}`;
    if (walkedCells.has(walkedCell)) {
      return -1; // loop detected
    } else {
      walkedCells.add(walkedCell);
    }
    matrix[loc.y][loc.x] = 'X'; // mark as visited
    let nextCell;
    do {
      nextCell = matrix[loc.y + dir.y]?.[loc.x + dir.x];
      if (nextCell === '#') { // turn right
        [dir.x, dir.y] = [-dir.y, dir.x];
      }
    } while (nextCell === '#');
    if (!nextCell) break; // end of the map
    loc.x += dir.x;
    loc.y += dir.y;
  }
  return matrix
    .reduce((acc, row) => acc + row.filter(cell => cell === 'X').length, 0);
}

function solve2(matrix) {
  let obstructionLoops = 0;
  for (let y = 0; y < matrix.length; y++) {
    // console.log('row:', y, 'of', matrix.length);
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === '.') {
        const copiedMatrix = matrix.map(row => [...row]);
        copiedMatrix[y][x] = '#';
        if (solve1(copiedMatrix) === -1) {
          obstructionLoops++;
        }
      }
    }
  }
  return obstructionLoops;
}

const input = parseInput(inputText);
console.log('Solution 1:', solve1(input));
console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');