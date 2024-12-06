import { readFileSync } from 'fs';
console.time('✨ Done in');
console.log('--- Day02 ---');

const inputText = readFileSync('./inputs/day02.txt', { encoding: 'utf8' });
// const inputText = `
// 7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9
// `; // test input

function parseInput(inputText) {
  return inputText
    .trim()
    .split('\n')
    .map((line) => line.split(' ').map(Number));
}

function solve1(reports) {
  function isDifferenceSafe(a, b) {
    const diff = Math.abs(a - b);
    return 1 <= diff && diff <= 3;
  }
  function getTendency(a, b) {
    if (a === b) return 0;
    return b - a > 0 ? 1 : -1;
  }
  return reports
    .map((report) => {
      const tendency = getTendency(report[0], report[1]);
      if (!tendency) return false;
      return report.every((num, i) => {
        if (i === report.length - 1) return true;
        const ten = getTendency(num, report[i + 1]);
        if (ten !== tendency) return false;
        return isDifferenceSafe(num, report[i + 1]);
      });
    })
    .filter(Boolean).length;
}

function solve2(reports) {
  function isDifferenceSafe(a, b) {
    const diff = Math.abs(a - b);
    return 1 <= diff && diff <= 3;
  }
  function getTendency(a, b) {
    if (a === b) return 0;
    return b - a > 0 ? 1 : -1;
  }
  function isReportSafe(report) {
    const tendency = getTendency(report[0], report[1]);
    if (!tendency) return false;
    return report.every((num, i) => {
      if (i === report.length - 1) return true;
      const ten = getTendency(num, report[i + 1]);
      if (ten !== tendency) return false;
      return isDifferenceSafe(num, report[i + 1]);
    });
  }
  return reports
    .map((report) => {
      if (isReportSafe(report)) return true;
      return report.some((num, i) => {
        const reportWithoutNum = [
          ...report.slice(0, i),
          ...report.slice(i + 1),
        ];
        return isReportSafe(reportWithoutNum);
      });
    })
    .filter(Boolean).length;
}

const input = parseInput(inputText);
const solution1 = solve1(input); // Solution 1
console.log('solution 1:', solution1);
const solution2 = solve2(input); // Solution 2
console.log('solution 2:', solution2);
console.timeEnd('✨ Done in');
