import { readFileSync } from 'fs';
console.time('✨ Done in');
console.log('--- Day16 ---');

let inputText = /* test input */`
#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################
`;
inputText = readFileSync('./inputs/day16.txt', {encoding:'utf8'}); // use input from file

function parseInput(inputText) {
  const maze = inputText.trim()
    .split('\n')
    .map(row => row.split(''));
  let start, end;
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === 'S') start = { x, y };
      if (maze[y][x] === 'E') end = { x, y };
    }
  }
  return { maze, start, end };
}

function solve1({ maze, start, end }) {
  const timeStart = Date.now();
  const COST_FOWARD = 1;
  const COST_TURN = 1000;
  let minCost = Infinity;
  let minPath;
  const walkedAt = {};
  function walkPath(x, y, direction, path, cost, lastX, lastY) {
    path.add(`${x},${y}`);
    cost += COST_FOWARD;
    const newDirection = getDirection(lastX, lastY, x, y);
    if (direction !== newDirection) cost += COST_TURN;
    if (walkedAt[`${x},${y},${direction}`] <= cost) return;
    walkedAt[`${x},${y},${direction}`] = cost;
    if (cost >= minCost) return;
    if (x === end.x && y === end.y) {
      minCost = cost;
      minPath = path;
      // console.log('New min cost:', minCost, 'calculated in', (Date.now() - timeStart) / 1000, 'seconds');
      return;
    }
    let wallsAround = 0;
    if (maze[y-1][x] === '#') wallsAround++;
    if (maze[y+1][x] === '#') wallsAround++;
    if (maze[y][x-1] === '#') wallsAround++;
    if (maze[y][x+1] === '#') wallsAround++;
    const makePathCopy = wallsAround <= 1;
    if (maze[y-1][x] !== '#' && (x !== lastX || y-1 !== lastY) && !path.has(`${x},${y-1}`)) walkPath(x, y-1, newDirection, makePathCopy ? new Set(path) : path, cost, x, y);
    if (maze[y+1][x] !== '#' && (x !== lastX || y+1 !== lastY) && !path.has(`${x},${y+1}`)) walkPath(x, y+1, newDirection, makePathCopy ? new Set(path) : path, cost, x, y);
    if (maze[y][x-1] !== '#' && (x-1 !== lastX || y !== lastY) && !path.has(`${x-1},${y}`)) walkPath(x-1, y, newDirection, makePathCopy ? new Set(path) : path, cost, x, y);
    if (maze[y][x+1] !== '#' && (x+1 !== lastX || y !== lastY) && !path.has(`${x+1},${y}`)) walkPath(x+1, y, newDirection, makePathCopy ? new Set(path) : path, cost, x, y);
  }
  function getDirection(x1, y1, x2, y2) {
    if (x1 === undefined || y1 === undefined) return 'RIGHT';
    if (x1 === x2) {
      return y2 > y1 ? 'DOWN' : 'UP';
    } else {
      return x2 > x1 ? 'RIGHT' : 'LEFT';
    }
  }
  walkPath(start.x, start.y, 'RIGHT', new Set(), -COST_FOWARD);
  return minCost;
}

function solve2({ maze, start, end }) {
  return input;
}

const input = parseInput(inputText);
console.log('Solution 1:', solve1(input));
// console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');