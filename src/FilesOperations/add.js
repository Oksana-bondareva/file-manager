import fs from 'fs';
import { join } from 'path';

const add = (args, currentDir, rl) => {
    if (args.length === 0) {
        rl.write('No file name specified\n');
        return;
    }

    if (args.length > 1) {
        rl.write('More than one file name has been entered\n');
        return;
    }

    const filePath = join(currentDir, args[0]);

    fs.writeFile(filePath, '', (err) => {
        if (err) {
            rl.write('Operation failed\n');
            return;
        }
        rl.write(`The file ${args[0]} was successfully created\n`);
    });
};

export default add;