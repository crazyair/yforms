const fs = require('fs');

const { readFileSync } = fs;

const stringFromFile = (path) => {
  return readFileSync(path, `utf8`);
};

const text = stringFromFile('./docs/changelog.md');
const versionLogs = text;

const allMatchingWords = versionLogs.split('## [');
let changelog = allMatchingWords[1];
changelog = changelog.replace(/%/g, '%25');
changelog = changelog.replace(/\n/g, '%0A');
changelog = changelog.replace(/\r/g, '%0D');

const demo = `::set-output name=changelog::## [${changelog}`;
// eslint-disable-next-line no-console
console.log(demo);
