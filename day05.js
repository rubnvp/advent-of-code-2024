import { readFileSync } from 'fs';
const DAY = '05';
console.time('✨ Done in');
console.log(`--- Day${DAY} ---`);

const inputText = true // use input from .txt
  ? readFileSync(`./inputs/day${DAY}.txt`, {encoding:'utf8'})
  : `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`; // test input

function parseInput(inputText) {
  const [rules, updates] = inputText.trim()
    .split('\n\n');
  return {
    rules: rules.split('\n').map(rule => rule.split('|').map(Number)),
    updates: updates.split('\n').map(page => page.split(',').map(Number)),
  };
}

function solve1({rules, updates}) {
  return updates
    .filter(pages => {
      return rules
        .every(([pageA, pageB]) => {
          const pageAIndex = pages.indexOf(pageA);
          const pageBIndex = pages.indexOf(pageB);
          if (pageAIndex === -1 || pageBIndex === -1) return true; // rule not applied
          return pageAIndex < pageBIndex;
        });
    })
    .map(pages => pages[(pages.length - 1) / 2])
    .reduce((acc, page) => acc + page, 0);
}

function solve2({rules, updates}) {
  return updates
    .filter(pages => {
      return rules
        .some(([pageA, pageB]) => {
          const pageAIndex = pages.indexOf(pageA);
          const pageBIndex = pages.indexOf(pageB);
          if (pageAIndex === -1 || pageBIndex === -1) return false; // rule not applied
          return pageAIndex > pageBIndex;
        });
    })
    .map(pages => {
      return pages.slice()
        .sort((pageA, pageB) => {
          const rule = rules // find the rule that applies to the pair of pages
            .find(([rulePageA, rulePageB]) => {
              return rulePageA === pageA && rulePageB === pageB || rulePageA === pageB && rulePageB === pageA;
            });
          if (!rule) return 0;
          return rule[0] === pageA ? -1 : 1;
        });
      })
      .map(pages => pages[(pages.length - 1) / 2])
      .reduce((acc, page) => acc + page, 0);
  }

const input = parseInput(inputText);
console.log('Solution 1:', solve1(input));
console.log('Solution 2:', solve2(input));
console.timeEnd('✨ Done in');