import fs from 'fs';
import path from 'path';

const cat = (args, currentDir, rl) => {
    if (args.length === 0) {
        rl.write('No file specified\n');
        return;
    }

    const filePath = path.resolve(currentDir, args[0]);
    const readStream = fs.createReadStream(filePath, 'utf8');

    readStream.on('error', (error) => {
        rl.write(`Operation failed: ${error}\n`);
    });

    readStream.on('data', (chunk) => {
        rl.write(chunk);
    });

    readStream.on('end', () => {
        rl.write('\n');
    });
};

export default cat;
