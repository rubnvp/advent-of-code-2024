import { readFileSync } from 'fs';
const DAY = 'XX';
console.time('✨ Done in');
console.log(`--- Day${DAY} ---`);

const inputText = false // use input from .txt
  ? readFileSync(`./inputs/day${DAY}.txt`, {encoding:'utf8'})
  : /* test input */`

`;

function parseInput(inputText) {
  return inputText.trim();
}

function solve1(input) {
  return input;
}

function solve2(input) {
  return input;
}

const input = parseInput(inputText);
console.log('Solution 1:', solve1(input));
// console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');