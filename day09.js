import { readFileSync } from 'fs';
console.time('✨ Done in');
console.log('--- Day09 ---');

let inputText = /* test input */`
2333133121414131402
`;
inputText = readFileSync('./inputs/day09.txt', {encoding:'utf8'});

function parseInput(inputText) {
  const diskNums = inputText.trim()
    .split('')
    .map(Number);
  return diskNums
    .reduce((memory, num, i) => {
      const isFile = i % 2 === 0;
      if (isFile) {
        const id = i / 2;
        memory.push(...Array.from({ length: num }, (_) => id));
      } else {
        memory.push(...Array.from({ length: num }, (_) => '.'));
      }
      return memory;
    }, []);
}

function solve1(expandedMemory) {
  expandedMemory = [...expandedMemory];
  let i = 0;
  let j = expandedMemory.length - 1;
  do {
    while (expandedMemory[i] !== '.') i++;
    while (expandedMemory[j] === '.') j--;
    if (i < j) {
      expandedMemory[i] = expandedMemory[j];
      expandedMemory[j] = '.';
    }
  } while (i < j);
  return expandedMemory
    .reduce((sum, num, i) => {
      if (num === '.') return sum;
      return sum + (num * i);
    }, 0);
}

function solve2(expandedMemory) {
  expandedMemory = [...expandedMemory];
  const lastId = expandedMemory.findLast((num) => num !== '.');
  for (let id = lastId; id >= 0; id--) {
    const start = expandedMemory.indexOf(id);
    const end = expandedMemory.lastIndexOf(id);
    const size = end - start + 1;
    const freeSpaceIndex = expandedMemory
      .findIndex((num, i) => {
        if (num !== '.') return false;
        for (let n = 1; n < size; n++) {
          if (expandedMemory[i + n] !== '.') return false;
        }
        return true;
      });
    if (freeSpaceIndex !== -1 && freeSpaceIndex < start) {
      expandedMemory.copyWithin(freeSpaceIndex, start, end + 1);
      expandedMemory.fill('.', start, end + 1);
    }
  }
  return expandedMemory
    .reduce((sum, num, i) => {
      if (num === '.') return sum;
      return sum + (num * i);
    }, 0);
}

const input = parseInput(inputText);
console.log('Solution 1:', solve1(input));
console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');