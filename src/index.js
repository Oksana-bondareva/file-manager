import readline from 'readline/promises';
import { stdin, stdout } from 'process';
import { homedir } from 'os';
import up from './up/up.js';

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

const usernameArg = process.argv.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Anonymous';
let currentDir = homedir();

rl.write(`Welcome to the File Manager, ${username}!\n`);
rl.write(`You are currently in ${currentDir}\n`);

rl.on('line', async (input) => {
  const [command, ...args] = input.trim().split(' ');

  switch (command) {
      case 'up':
          currentDir = up(currentDir);
          rl.write(`You are currently in ${currentDir}\n`);
          break;
      case '.exit':
          rl.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
          process.exit(0);
  }
}).on('close', () => {
  rl.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
});