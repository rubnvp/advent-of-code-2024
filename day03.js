import { readFileSync } from 'fs';
console.time('✨ Done in');
console.log('--- Day03 ---');

const inputText = readFileSync('./inputs/day03.txt', { encoding: 'utf8' });
// const inputText = `
// xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
// `; // test input
// const inputText = `
// 12don't()3
// do()45don't()67do()89do()10
// 111213don't()14don't()15
// `; // test input

function parseInput(inputText) {
  return inputText.trim().replaceAll('\n', '');
}

function solve1(input) {
  const matches = input.match(/mul\((\d{1,3}),(\d{1,3})\)/g);
  return matches
    .map((match) => {
      const [a, b] = match.match(/\d{1,3}/g).map(Number);
      return a * b;
    })
    .reduce((acc, val) => acc + val, 0);
}

function solve2(input) {
  const cleanedInput = input
    .replaceAll(/don\'t\(\).*?do\(\)/g, '_')
    .replace(/don\'t\(\).*$/, '_');
  return solve1(cleanedInput);
  // return cleanedInput;
}

const input = parseInput(inputText);
const solution1 = solve1(input); // Solution 1
console.log('solution 1:', solution1);
const solution2 = solve2(input); // Solution 2
console.log('solution 2:', solution2);
console.timeEnd('✨ Done in');
