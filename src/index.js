import readline from 'readline/promises';
import { stdin, stdout } from 'process';
import { homedir } from 'os';
import up from './Navigation/up.js';
import cd from './Navigation/cd.js';
import ls from './Navigation/ls.js';
import { printCurrentDir } from './Utils/utils.js';

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

const usernameArg = process.argv.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Anonymous';
let currentDir = homedir();

rl.write(`Welcome to the File Manager, ${username}!\n`);
printCurrentDir(rl, currentDir);

rl.on('line', async (input) => {
  const [command, ...args] = input.trim().split(' ');

  switch (command) {
      case 'up':
          currentDir = up(currentDir);
          printCurrentDir(rl, currentDir);
          break;
      case 'cd':
          currentDir = await cd(args, currentDir, rl);
          printCurrentDir(rl, currentDir);
          break;
      case 'ls':
          currentDir = await ls(currentDir, rl);
          break;
      case '.exit':
          rl.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
          process.exit(0);
  }
}).on('close', () => {
  rl.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
});