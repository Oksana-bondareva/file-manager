import readline from 'readline/promises';
import { stdin, stdout } from 'process';
import { homedir } from 'os';

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

const usernameArg = process.argv.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Anonymous';
const currentDir = homedir();

rl.write(`Welcome to the File Manager, ${username}!\n`);
rl.write(`You are currently in ${currentDir}\n`);
