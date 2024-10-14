import fs from 'fs/promises';
import { join } from 'path';

export default async function rn(args, currentDir, rl) {
    if (args.length !==2) {
        rl.write('Error: you must write <current_filename> <new_filename>\n');
        return;
    }

    const currentFilePath = join(currentDir, args[0]);
    const newFilePath = join(currentDir, args[1]);

    try {
        await fs.rename(currentFilePath, newFilePath);
        rl.write(`Renamed ${args[0]} to ${args[1]}\n`);
    } catch (error) {
        rl.write(`Operation failed: ${error.message}\n`);
    }
}