import fs from 'fs';
import { createHash } from 'crypto';
import { join } from 'path';

const hash = (args, currentDir, rl) => {
    if (args.length !== 1) {
        rl.write('You must write hash <path_to_file>\n');
        return;
    }

    const filePath = join(currentDir, args[0]);
    const hashStream = createHash('sha256');
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('error', (error) => {
        rl.write(`Operation failed: ${error.message}\n`);
    });

    fileStream.on('data', (chunk) => {
        hashStream.update(chunk);
    });

    fileStream.on('end', () => {
        rl.write(`${hashStream.digest('hex')}\n`);
    });
};

export default hash;
