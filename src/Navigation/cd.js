import fs from 'fs/promises';
import path from 'path';

const cd = async (args, currentDir, rl) => {
    if (args.length === 0) {
        rl.write('No directory specified\n');
        return currentDir;
    }
    const newDir = path.resolve(currentDir, args[0]);
    try {
        const stats = await fs.stat(newDir);
        if (stats.isDirectory()) {
            return newDir;
        } else {
            rl.write('Not a directory\n');
            return currentDir;
        }
    } catch (err) {
        rl.write('Directory does not exist\n');
        return currentDir;
    }
};

export default cd;
