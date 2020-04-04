const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputName = (inputYob) => {
  rl.question("What's your name?", (name) => {
    inputYob(name);
});
};
const inputYob = (name) => {
  rl.question("What's your year of birth?", (yob) => {
    const age = new Date().getFullYear() - yob;
    inputHomeTown(name, age);
  });
};

const inputHomeTown = (name, yob) => {
  rl.question("What's your home town?", (homeTown) => {
    console.log(
      `Thank you. Hello ${chalk.yellow(name)}, so you are ${chalk.blue(
        yob
      )} years old and from ${chalk.red(homeTown)}`
);
    rl.close();
  });
};
inputName(inputYob);
