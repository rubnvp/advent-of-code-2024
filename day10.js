import { readFileSync } from 'fs';
import { get } from 'http';
console.time('✨ Done in');
console.log('--- Day10 ---');

let inputText = /* test input */`
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`;
inputText = readFileSync('./inputs/day10.txt', {encoding:'utf8'});

function parseInput(inputText) {
  return inputText.trim()
    .split('\n')
    .map(line => line.split('').map(Number));
}

function solve1(topoMap) {
  const pathScores = [];
  for (let y = 0; y < topoMap.length; y++) {
    for (let x = 0; x < topoMap[y].length; x++) {
      if (topoMap[y][x] === 0) {
        const trails = getTrails(y, x);
        const pathScore = (new Set(trails)).size;
        pathScores.push(pathScore);
      }
    }
  }
  function getTrails(y, x) {
    const num = topoMap[y][x];
    if (num === 9) {
      return [`${y},${x}`];
    }
    const nextNum = num + 1;
    return [
      ...(topoMap[y][x+1] === nextNum ? getTrails(y, x + 1) : []),
      ...(topoMap[y][x-1] === nextNum ? getTrails(y, x - 1) : []),
      ...(topoMap[y+1]?.[x] === nextNum ? getTrails(y + 1, x) : []),
      ...(topoMap[y-1]?.[x] === nextNum ? getTrails(y - 1, x) : []),
    ];
  }
  return pathScores.reduce((sum, num) => sum + num);
}

function solve2(topoMap) {
  const pathScores = [];
  for (let y = 0; y < topoMap.length; y++) {
    for (let x = 0; x < topoMap[y].length; x++) {
      if (topoMap[y][x] === 0) {
        const trails = getTrails(y, x);
        const pathScore = trails.length;
        pathScores.push(pathScore);
      }
    }
  }
  function getTrails(y, x) {
    const num = topoMap[y][x];
    if (num === 9) {
      return [`${y},${x}`];
    }
    const nextNum = num + 1;
    return [
      ...(topoMap[y][x+1] === nextNum ? getTrails(y, x + 1) : []),
      ...(topoMap[y][x-1] === nextNum ? getTrails(y, x - 1) : []),
      ...(topoMap[y+1]?.[x] === nextNum ? getTrails(y + 1, x) : []),
      ...(topoMap[y-1]?.[x] === nextNum ? getTrails(y - 1, x) : []),
    ];
  }
  return pathScores.reduce((sum, num) => sum + num);
}

const input = parseInput(inputText);
console.log('Solution 1:', solve1(input));
console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');