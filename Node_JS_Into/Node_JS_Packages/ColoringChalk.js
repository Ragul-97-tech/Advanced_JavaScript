import chalk from "chalk";
import colour from "colour";

const {log} = console;

console.log(chalk.green("hi"));
log("hello".rainbow);
log()

colour.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: ['yellow', 'underline'], // Applies two styles at once
  debug: 'blue',
  error: 'red bold' // Again, two styles
});
colour.mode = 'browser'; 

log("This".warn);
