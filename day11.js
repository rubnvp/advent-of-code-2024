import { readFileSync } from 'fs';
console.time('✨ Done in');
console.log('--- Day11 ---');

let inputText = /* test input */`
125 17
`;
inputText = readFileSync('./inputs/day11.txt', {encoding:'utf8'});

function parseInput(inputText) {
  return inputText.trim()
    .split(' ')
    .map(Number);
}

function solve1(stones) {
  const BLINKS = 25;
  for (let blink = 0; blink < BLINKS; blink++) {
    stones = stones.reduce((stones, num) => {
      const stoneString = num.toString();
      if (num === 0) {
        stones.push(1);
      } else if (stoneString.length % 2 === 0) {
        stones.push(Number(stoneString.slice(0, stoneString.length / 2)));
        stones.push(Number(stoneString.slice(stoneString.length / 2)));
      } else {
        stones.push(num * 2024);
      }
      return stones;
    }, []);
  }
  return stones.length;
}

function solve2(stones) {
  return stones;
}

const input = parseInput(inputText);
// console.log('Solution 1:', solve1(input));
console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');

// Failed solution2 attempts

// Nested array approach
// function solve2(stones) {
//   stones = stones.slice();
//   const BLINKS = 75;
//   for (let blink = 0; blink < BLINKS; blink++) {
//     console.log('Blink:', blink);
//     mapRecursive(stones, mapStoneToStones);
//   }
//   function mapRecursive(elements, mapFunction) {
//     elements.forEach((element, index) => {
//       if (Array.isArray(element)) {
//         mapRecursive(element, mapFunction);
//       } else {
//         elements[index] = mapFunction(element);
//       }
//     });
//   }
//   function mapStoneToStones(stone) {
//     if (stone === 0) return 1;
//     const stoneString = stone.toString();
//     if (stoneString.length % 2 === 0) {
//       return [
//         Number(stoneString.slice(0, stoneString.length / 2)),
//         Number(stoneString.slice(stoneString.length / 2)),
//       ];
//     }
//     return stone * 2024;
//   }
//   function countRecursive(elements) {
//     return elements.reduce((count, element) => {
//       if (Array.isArray(element)) {
//         return count + countRecursive(element);
//       }
//       return count + 1;
//     }, 0);
//   }
//   return countRecursive(stones);
// }


// Single string approach
// function solve2(stones) {
//   const BLINKS = 75;
//   stones = stones.join(' ');
//   function mapStone(stone) {
//     if (stone === '0') return '1';
//     if (stone.length % 2 === 0) {
//       return `${Number(stone.slice(0, stone.length / 2))} ${Number(stone.slice(stone.length / 2))}`;
//     }
//     return `${Number(stone) * 2024}`;
//   }
//   for (let blink = 0; blink < BLINKS; blink++) {
//     console.log('Blink:', blink);
//     let newStones = '';
//     for (let i = 0; i < stones.length; i++) {
//       let j = i;
//       let stone = '';
//       while (stones[j] !== ' ' && j < stones.length) {
//         stone += stones[j];
//         j++;
//       }
//       if (newStones) newStones += ' ';
//       newStones += mapStone(stone);
//       i = j;
//     }
//     stones = newStones;
//   }
//   let count = 1;
//   for (let i = 0; i < stones.length; i++) {
//     if (stones[i] === ' ') {
//       count++;
//     }
//   }
//   return count;
// }