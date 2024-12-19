import { readFileSync } from 'fs';
console.time('✨ Done in');
console.log('--- Day19 ---');

let inputText = /* test input */`
r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`;
inputText = readFileSync('./inputs/day19.txt', {encoding:'utf8'}); // use input from file

function parseInput(inputText) {
  const [patternString, designString] = inputText.trim()
    .split('\n\n');
  const patterns = patternString.split(', ');
  const designs = designString
    .split('\n');
  return {patterns, designs};
}

function solve1({patterns, designs}) {
  const cache = {}; // avoid repetitions
  function isValidDesign(design) {
    if (design in cache) return cache[design];
    if (!design) {
      cache[design] = true;
      return true;
    }
    const designRests = patterns
      .filter(pattern => design.startsWith(pattern))
      .map(pattern => design.slice(pattern.length));
    const result = designRests.some(rest => isValidDesign(rest));
    cache[design] = result;
    return result;
  }
  return designs
    .filter(isValidDesign)
    .length;
}

function solve2({patterns, designs}) {
  const cache = {};
  function countValidDesigns(design, count) {
    if (design in cache) {
      count.value += cache[design];
      return;
    }
    if (!design) {
      count.value++;
      return true;
    }
    const designRests = patterns
      .filter(pattern => design.startsWith(pattern))
      .map(pattern => design.slice(pattern.length));
    
    const previousCount = count.value;
    designRests
      .forEach(rest => countValidDesigns(rest, count));
    cache[design] = count.value - previousCount;
  }
  return designs
    .map(design => {
      const count = {value: 0};
      countValidDesigns(design, count);
      return count.value;
    })
    .reduce((sum, num) => sum + num, 0);
}

const input = parseInput(inputText);
console.log('Solution 1:', solve1(input));
console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');