const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What's your name?", (name) => {
  rl.question("What's your year of birth?", (yob) => {
    const age = new Date().getFullYear() - yob;
    rl.question("What's your home town?", (homeTown) => {
      console.log(
        `Thank you. Hello ${chalk.yellow(name)}, so you are ${chalk.blue(
          age
        )} years old and from ${chalk.red(homeTown)}`
      );
      rl.close();
    });
  });
});
