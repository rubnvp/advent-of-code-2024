import { readFileSync } from 'fs';
console.time('✨ Done in');
console.log('--- Day04 ---');

const inputText = readFileSync('./inputs/day04.txt', {encoding:'utf8'});
// const inputText = `
// MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX
// `; // test input

function parseInput(inputText) {
  return inputText
    .trim()
    .split('\n')
    .map((row) => row.split(''));
}

function solve1(matrix) {
  const width = matrix[0].length;
  const height = matrix.length;

  const horizontalLines = matrix
    .map((row) => row.join(''));

  const verticalLines = matrix[0]
    .map((_, i) => matrix
      .map((row) => row[i])
      .join('')
    );
  
  const diagonal1Lines = [];
  for (let i = -width; i < width; i++) {
    let line = '';
    for (let j = 0; j < height; j++) {
      line += matrix[j]?.[i + j] ?? '';
    }
    diagonal1Lines.push(line);
  }

  const diagonal2Lines = [];
  for (let i = 0; i < 2 * width; i++) {
    let line = '';
    for (let j = 0; j < height; j++) {
      line += matrix[j]?.[i - j] ?? '';
    }
    diagonal2Lines.push(line);
  }

  const WORD = /XMAS/g;
  const REVERSED_WORD = /SAMX/g;
  return [
    ...horizontalLines,
    ...verticalLines,
    ...diagonal1Lines,
    ...diagonal2Lines,
  ].reduce((occurrences, line) => {
      let matches = line.match(WORD);
      occurrences += matches?.length ?? 0;
      matches = line.match(REVERSED_WORD);
      occurrences += matches?.length ?? 0;
      return occurrences;
    }, 0);
}

function solve2(matrix) {
  let occurrences = 0;
  const XWORDS = ['MAS', 'SAM'];
  const width = matrix[0].length;
  const height = matrix.length;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (matrix[y][x] !== 'A') continue;
      const diagonal1 = `${matrix[y - 1][x - 1]}${matrix[y][x]}${matrix[y + 1][x + 1]}`;
      const diagonal2 = `${matrix[y + 1][x - 1]}${matrix[y][x]}${matrix[y - 1][x + 1]}`;
      if (XWORDS.includes(diagonal1) && XWORDS.includes(diagonal2)) {
        occurrences++;
      }
    }
  }
  return occurrences;
}

const input = parseInput(inputText);
const solution1 = solve1(input); // Solution 1
console.log('solution 1:', solution1);
const solution2 = solve2(input); // Solution 2
console.log('solution 2:', solution2);
console.timeEnd('✨ Done in');
