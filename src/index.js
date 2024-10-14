import readline from 'readline/promises';
import { stdin, stdout } from 'process';
import { homedir } from 'os';
import up from './Navigation/up.js';
import cd from './Navigation/cd.js';
import ls from './Navigation/ls.js';
import cat from './FilesOperations/cat.js';
import add from './FilesOperations/add.js';
import rn from './FilesOperations/rename.js';
import cp from './FilesOperations/copy.js';
import mv from './FilesOperations/move.js';
import rm from './FilesOperations/delete.js';
import osInfo from './Operating/osInfo.js';
import hash from './Hash/hash.js';
import compress from './CompressOperations/compress.js';
import decompress from './CompressOperations/decompress.js';
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
        case 'cat':
            cat(args, currentDir, rl);
            break;
        case 'add':
            add(args, currentDir, rl);
            break;
        case 'rn':
            rn(args, currentDir, rl);
            break;
        case 'cp':
            cp(args, currentDir, rl);
            break;
        case 'mv':
            mv(args, currentDir, rl);
            break;
        case 'rm':
            rm(args, currentDir, rl);
            break;
        case 'os':
            osInfo(args, rl);
            break;
        case 'hash':
            hash(args, currentDir, rl);
            break;
        case 'compress':
            compress(args, currentDir, rl);
            break;
        case 'decompress':
            decompress(args, currentDir, rl);
            break;
        case '.exit':
            rl.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
            process.exit(0);
        }

    rl.on('SIGINT', () => {
        rl.write(`\nThank you for using File Manager, ${username}, goodbye!\n`);
        process.exit(0);
    });
});