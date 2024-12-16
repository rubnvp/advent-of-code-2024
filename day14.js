import { readFileSync } from 'fs';
console.time('✨ Done in');
console.log('--- Day14 ---');

let inputText = /* test input */`
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3
`;
inputText = readFileSync('./inputs/day14.txt', {encoding:'utf8'}); // use input from file

function parseInput(inputText) {
  return inputText.trim()
    .split('\n')
    .map(line => {
      const [x, y, vX, vY] = line.match(/-?\d+/g).map(Number);
      return { x, y, vX, vY };
    });
}

function solve1(robots) {
  const MAP_WIDTH = 101;
  const MAP_HEIGHT = 103;
  const SECONDS = 100;
  const positions = robots
    .map(({ x, y, vX, vY }) => {
      const posX = (x + vX * SECONDS) % MAP_WIDTH;
      const posY = (y + vY * SECONDS) % MAP_HEIGHT;
      return {
        x: posX < 0 ? posX + MAP_WIDTH : posX,
        y: posY < 0 ? posY + MAP_HEIGHT : posY
      }
    });
  const HALF_WIDTH = Math.floor(MAP_WIDTH / 2);
  const HALF_HEIGHT = Math.floor(MAP_HEIGHT / 2);
  const firstQuadrant = positions.filter(({ x, y }) => x < HALF_WIDTH && y < HALF_HEIGHT);
  const secondQuadrant = positions.filter(({ x, y }) => x > HALF_WIDTH && y < HALF_HEIGHT);
  const thirdQuadrant = positions.filter(({ x, y }) => x < HALF_WIDTH && y > HALF_HEIGHT);
  const fourthQuadrant = positions.filter(({ x, y }) => x > HALF_WIDTH && y > HALF_HEIGHT);
  return firstQuadrant.length * secondQuadrant.length * thirdQuadrant.length * fourthQuadrant.length;
}

function solve2(robots) {
  const MAP_WIDTH = 101; // 11;
  const MAP_HEIGHT = 103; // 7;
  function getPositionsAt(time) {
    return robots
      .map(({ x, y, vX, vY }) => {
        const posX = (x + vX * time) % MAP_WIDTH;
        const posY = (y + vY * time) % MAP_HEIGHT;
        return {
          x: posX < 0 ? posX + MAP_WIDTH : posX,
          y: posY < 0 ? posY + MAP_HEIGHT : posY
        }
      });
  }
  function paintPositions(positions) {
    const map = Array.from({ length: MAP_HEIGHT }, () => Array.from({ length: MAP_WIDTH }, () => '.'));
    positions.forEach(({ x, y }) => map[y][x] = '*');
    const mapStr = map.map(row => row.join('')).join('\n');
    console.log('\n' + mapStr);
  }
  let time = 0;
  const hasRobotAt = (positions, {x, y}) => positions.find(pos => pos.x === x && y === pos.y);
  function looksLikeATree(positions) {
    return ({ x, y }) => {
      return hasRobotAt(positions, { x: x - 1, y: y + 1 }) && hasRobotAt(positions, { x: x + 1, y: y + 1 }) &&
        hasRobotAt(positions, { x: x - 2, y: y + 2 }) && hasRobotAt(positions, { x: x + 2, y: y + 2 }) &&
        hasRobotAt(positions, { x: x - 3, y: y + 3 }) && hasRobotAt(positions, { x: x + 3, y: y + 3 }) &&
        hasRobotAt(positions, { x: x - 4, y: y + 4 }) && hasRobotAt(positions, { x: x + 4, y: y + 4 });
    }
  }
  while (true) {
    const positions = getPositionsAt(time);
    if (positions.some(looksLikeATree(positions))) {
      paintPositions(positions);
      break;
    }
    time++;
  }
  return time;
}

const input = parseInput(inputText);
console.log('Solution 1:', solve1(input));
console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');