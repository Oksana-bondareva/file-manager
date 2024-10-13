import fs from 'fs/promises';
import { join } from 'path';

export default async function ls(currentDir, rl) {
    try {
        const files = await fs.readdir(currentDir);
        files.forEach(async (file, index) => {
            const filePath = join(currentDir, file);
            const stats = await fs.stat(filePath);
            console.table(`${index} name: ${file} type: ${stats.isDirectory() ? 'directory' : 'file'}\n`);
        });
    } catch {
        rl.write('Operation failed\n');
    }
}
