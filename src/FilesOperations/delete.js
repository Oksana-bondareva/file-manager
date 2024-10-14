import fs from 'fs/promises';
import { join } from 'path';

const rm = async (args, currentDir, rl) => {
    if (args.length !== 1) {
        rl.write('You must write rm <path_to_file>\n');
        return;
    }

    const filePath = join(currentDir, args[0]);

    try {
        await fs.unlink(filePath);
    } catch (error) {
        rl.write(`Operation failed: ${error.message}\n`);
    }
};

export default rm;
