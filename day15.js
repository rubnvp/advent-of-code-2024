import { readFileSync } from 'fs';
console.time('✨ Done in');
console.log('--- Day15 ---');

let inputText = /* test input */`
########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<
`;
inputText = readFileSync('./inputs/day15.txt', {encoding:'utf8'}); // use input from file

function parseInput(inputText) {
  const [matrixString, instructionsString] = inputText.trim()
    .split('\n\n');
  const matrix = matrixString.split('\n').map(row => row.split(''));
  const instructions = instructionsString.trim().replaceAll('\n', '').split('');
  return { matrix, instructions };
}

function solve1({ matrix, instructions }) {
  matrix = JSON.parse(JSON.stringify(matrix)); // deep copy to avoid mutate the original
  // const directionToInc = { '^': [-1, 0], '>': [0, 1], 'v': [1, 0], '<': [0, -1] };
  const pos = { x: 0, y: 0 };
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const cell = matrix[y][x];
      if (cell === '@') {
        pos.x = x;
        pos.y = y;
        break;
      }
    }
  }
  // console.log('Initial state:');
  // paintMatrix(matrix);
  instructions.forEach((instruction) => {
    // console.log(`Move ${instruction}:`);
    if (instruction === '>') {
      const aheadCells = matrix[pos.y].slice(pos.x + 1);
      const nextSpaceIndex = getNextSpaceIndex(aheadCells);
      if (nextSpaceIndex === -1) return;
      let temp = '@';
      for (let i = 0; i <= nextSpaceIndex; i++) {
        const aheadCell = matrix[pos.y][pos.x + (i + 1)];
        const temp2 = aheadCell;
        matrix[pos.y][pos.x + (i + 1)] = temp;
        temp = temp2;
      }
      matrix[pos.y][pos.x] = '.';
      pos.x++;
    }
    if (instruction === '<') {
      const aheadCells = matrix[pos.y].slice(0, pos.x).reverse();
      const nextSpaceIndex = getNextSpaceIndex(aheadCells);
      if (nextSpaceIndex === -1) return;
      let temp = '@';
      for (let i = 0; i <= nextSpaceIndex; i++) {
        const aheadCell = matrix[pos.y][pos.x - (i + 1)];
        const temp2 = aheadCell;
        matrix[pos.y][pos.x - (i + 1)] = temp;
        temp = temp2;
      }
      matrix[pos.y][pos.x] = '.';
      pos.x--;
    }
    if (instruction === '^') {
      const aheadCells = matrix.map(row => row[pos.x]).slice(0, pos.y).reverse();
      const nextSpaceIndex = getNextSpaceIndex(aheadCells);
      if (nextSpaceIndex === -1) return;
      let temp = '@';
      for (let i = 0; i <= nextSpaceIndex; i++) {
        const aheadCell = matrix[pos.y - (i + 1)][pos.x];
        const temp2 = aheadCell;
        matrix[pos.y - (i + 1)][pos.x] = temp;
        temp = temp2;
      }
      matrix[pos.y][pos.x] = '.';
      pos.y--;
    }
    if (instruction === 'v') {
      const aheadCells = matrix.map(row => row[pos.x]).slice(pos.y + 1);
      const nextSpaceIndex = getNextSpaceIndex(aheadCells);
      if (nextSpaceIndex === -1) return;
      let temp = '@';
      for (let i = 0; i <= nextSpaceIndex; i++) {
        const aheadCell = matrix[pos.y + (i + 1)][pos.x];
        const temp2 = aheadCell;
        matrix[pos.y + (i + 1)][pos.x] = temp;
        temp = temp2;
      }
      matrix[pos.y][pos.x] = '.';
      pos.y++;
    }
    // paintMatrix(matrix);
  });

  function getNextSpaceIndex(aheadCells) {
    const index = aheadCells.findIndex(cell => cell === '.' || cell === '#');
    return aheadCells[index] === '.' ? index : -1;
  }

  // function paintMatrix(matrix) {
  //   console.log(matrix.map(row => row.join('')).join('\n')+ '\n');
  // }
  // paintMatrix(matrix);
  let sum = 0;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 'O') sum += 100 * y + x;
    }
  }

  return sum;
}

function solve2({ matrix, instructions }) {
  const pos = { x: 0, y: 0 };
  const boxes = [];
  const matrixWall = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const x2 = x * 2;
      if (matrix[y][x] === 'O') boxes.push({ x: x2, y });
      if (matrix[y][x] === '#') {
        if (!matrixWall[y]) matrixWall[y] = [];
        matrixWall[y][x2] = '#';
        matrixWall[y][x2+1] = '#';
      }
      if (matrix[y][x] === '@') {
        pos.x = x2;
        pos.y = y;
      }
    }
  }
  function getBox(x, y) {
    return boxes.find(box => box.y === y && (box.x === x || x === box.x + 1));
  }
  function getCell(x, y) {
    if (matrixWall[y]?.[x]) return '#';
    const box = getBox(x, y);
    if (box) return box;
    return '.';
  }
  function getAddition(direction) {
    if (direction === '>') return [1, 0];
    if (direction === '<') return [-1, 0];
    if (direction === '^') return [0, -1];
    if (direction === 'v') return [0, 1];
  }
  function getNewPos(x, y, direction) {
    const [addX, addY] = getAddition(direction);
    return [x + addX, y + addY];
  }
  function checkRecursive(x, y, direction, boxes) {
    const cell = getCell(x, y);
    if (cell === '.') return true;
    if (cell === '#') return false;
    const box = cell;
    boxes.add(box);
    const [newX, newY] = getNewPos(x, y, direction);
    if (direction === '>' || direction === '<') {
      return checkRecursive(newX, newY, direction, boxes);  
    }
    // direction ^ or v
    return checkRecursive(box.x, newY, direction, boxes) && checkRecursive(box.x + 1, newY, direction, boxes);
  }
  instructions.forEach((direction) => {
    const [newX, newY] = getNewPos(pos.x, pos.y, direction);
    const boxes = new Set();
    if (!checkRecursive(newX, newY, direction, boxes)) return;
    // move robot position
    pos.x = newX;
    pos.y = newY;
    // move boxes
    const [addX, addY] = getAddition(direction);
    boxes.forEach(box => {
      box.x += addX;
      box.y += addY;
    });
  });
  function paintMatrix() {
    const matrix = [];
    for (let y = 0; y < matrixWall.length; y++) {
      for (let x = 0; x < matrixWall[y].length; x++) {
        if (!matrix[y]) matrix[y] = [];
        matrix[y][x] = matrixWall[y][x] || '.';
      }
    }
    boxes.forEach(box => {
      matrix[box.y][box.x] = '[';
      matrix[box.y][box.x+1] = ']';
    });
    matrix[pos.y][pos.x] = '@';
    console.log(matrix.map(row => row.join('')).join('\n')+ '\n');
  }
  // paintMatrix();
  return boxes.reduce((sum, box) => sum + (box.y * 100 + box.x), 0);
}

const input = parseInput(inputText);
console.log('Solution 1:', solve1(input));
console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');