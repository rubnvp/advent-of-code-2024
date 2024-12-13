import { readFileSync } from 'fs';
import { machine } from 'os';
console.time('✨ Done in');
console.log('--- Day13 ---');

let inputText = /* test input */`
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
`;
inputText = readFileSync('./inputs/day13.txt', {encoding:'utf8'}); // use input from file

function parseInput(inputText) {
  return inputText.trim()
    .split('\n\n')
    .map(machineGroup => {
      const [lineA, lineB, linePrize] = machineGroup.split('\n');
      const [xA, yA] = lineA.match(/X\+(\d+), Y\+(\d+)/).slice(1).map(Number);
      const [xB, yB] = lineB.match(/X\+(\d+), Y\+(\d+)/).slice(1).map(Number);
      const [xFinal, yFinal] = linePrize.match(/X=(\d+), Y=(\d+)/).slice(1).map(Number);
      return { xA, yA, xB, yB, xFinal, yFinal };
    });
}

function solve1(machines) {
  const A_PRICE = 3;
  const B_PRICE = 1;
  return machines
    .map(({ xA, yA, xB, yB, xFinal, yFinal }) => {
      const countA = (xB*yFinal - yB*xFinal)/(yA*xB - yB*xA); // solution to for the equation system
      const countB = (xA*yFinal - yA*xFinal)/(yB*xA - yA*xB);
      return { countA, countB };
    })
    .filter(({ countA, countB }) => Number.isInteger(countA) && Number.isInteger(countB))
    .filter(({ countA, countB }) => countA <= 100 && countB <= 100)
    .map(({ countA, countB }) => countA*A_PRICE + countB*B_PRICE)
    .reduce((sum, val) => sum + val);
}

function solve2(machines) {
  const A_PRICE = 3;
  const B_PRICE = 1;
  const ADDITION = 10000000000000;
  return machines
    .map(machine => {
      machine.xFinal += ADDITION;
      machine.yFinal += ADDITION;
      return machine;
    })
    .map(({ xA, yA, xB, yB, xFinal, yFinal }) => {
      const countA = (xB*yFinal - yB*xFinal)/(yA*xB - yB*xA); // solution to for the equation system
      const countB = (xA*yFinal - yA*xFinal)/(yB*xA - yA*xB);
      return { countA, countB };
    })
    .filter(({ countA, countB }) => Number.isInteger(countA) && Number.isInteger(countB))
    .map(({ countA, countB }) => countA*A_PRICE + countB*B_PRICE)
    .reduce((sum, val) => sum + val, 0);
}

const input = parseInput(inputText);
console.log('Solution 1:', solve1(input));
console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');