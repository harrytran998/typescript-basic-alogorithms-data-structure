
const fs = require('fs');
const chalk = require('chalk');

const msgPath = process.env.HUSKY_GIT_PARAMS;
const msg = fs.readFileSync(msgPath, 'utf-8').trim();
const commitRegex = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|release)(\(.+\))?: .{1,50}/;

if (!commitRegex.test(msg)) {
  console.log();
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid commit message format.`)}\n\n` +
      chalk.red(`  Proper commit message format is required for automated changelog generation. Examples:\n\n`) +
      `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
      `    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}\n\n` +
      chalk.red(`  See https://github.com/viet-talent/viet-talent#contributing for more details.\n`),
  );
  process.exit(1);
}