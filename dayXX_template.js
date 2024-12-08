import { readFileSync } from 'fs';
console.time('✨ Done in');
console.log('--- DayXX ---');

const inputText = false // use input from .txt
  ? readFileSync('./inputs/dayXX.txt', {encoding:'utf8'})
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