import { readFileSync } from 'fs';
const DAY = '07';
console.time('✨ Done in');
console.log(`--- Day${DAY} ---`);

const inputText = true // use input from .txt
  ? readFileSync(`./inputs/day${DAY}.txt`, {encoding:'utf8'})
  : /* test input */`
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`;

function parseInput(inputText) {
  return inputText.trim()
    .split('\n')
    .map(line => {
      const [resultString, numsString] = line.split(': ');
      const result = parseInt(resultString);
      const nums = numsString.split(' ').map(num => parseInt(num));
      return { result, nums };
    });
}

function solve1(equoations) {
  return equoations
    .filter(({ result, nums }) => {
      const maxIterations = 2**(nums.length - 1);
      for (let i = 0; i < maxIterations; i++) {
        const operations = i.toString(2)
          .padStart(nums.length - 1, '0');
        const resultEq = nums
          .reduce((total, num, j) => {
            const operation = operations[j - 1];
            return operation === '0' ? total + num : total * num;
          });
        if (resultEq === result) return true;
      }
      return false;
    })
    .reduce((sum, { result }) => sum + result, 0);
}

function solve2(equoations) {
  return equoations
    .filter(({ result, nums }) => {
      const maxIterations = 3**(nums.length - 1);
      for (let i = 0; i < maxIterations; i++) {
        const operations = i.toString(3)
          .padStart(nums.length - 1, '0');
        const resultEq = nums
          .reduce((total, num, j) => {
            const operation = operations[j - 1];
            if (operation === '0') return total + num;
            if (operation === '1') return total * num;
            // operation 2, concat operator
            return parseInt(total.toString() + num.toString());
          });
        if (resultEq === result) return true;
      }
      return false;
    })
    .reduce((sum, { result }) => sum + result, 0);
}

const input = parseInput(inputText);
console.log('Solution 1:', solve1(input));
console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');