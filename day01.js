import { readFileSync } from 'fs';
console.time('✨ Done in');
console.log('--- Day01 ---');

const inputText = readFileSync('./inputs/day01.txt', { encoding: 'utf8' });
// const inputText = `
// 3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3
// `; // test input

function parseInput(inputText) {
  return inputText
    .trim()
    .split('\n')
    .map((line) => line.split('   '))
    .map((line) => line.map(Number));
}

function solve1(input) {
  const [list1, list2] = input.reduce(
    (acc, [a, b]) => {
      acc[0].push(a);
      acc[1].push(b);
      return acc;
    },
    [[], []]
  );
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);
  const differences = list1.map((a, i) => Math.abs(list2[i] - a));
  return differences.reduce((acc, diff) => acc + diff, 0);
}

function solve2(input) {
  const [list1, list2] = input.reduce(
    (acc, [a, b]) => {
      acc[0].push(a);
      acc[1].push(b);
      return acc;
    },
    [[], []]
  );
  const similarities = list1.map((num) => {
    const ocurrences = list2.filter((n) => n === num);
    return ocurrences.length * num;
  });
  return similarities.reduce((acc, sim) => acc + sim, 0);
}

const input = parseInput(inputText);
const solution1 = solve1(input); // Solution 1
console.log('solution 1:', solution1);
const solution2 = solve2(input); // Solution 2
console.log('solution 2:', solution2);
console.timeEnd('✨ Done in');
