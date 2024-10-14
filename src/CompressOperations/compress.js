import fs from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { join, resolve, parse } from 'path';

const compress = async (args, currentDir, rl) => {
    if (args.length !== 2) {
        rl.write('You must write compress <path_to_file> <path_to_destination>\n');
        return;
    }

    const filePath = join(currentDir, args[0]);
    const destinationPath = join(currentDir, args[1]);

    try {
        await fs.promises.mkdir(destinationPath, { recursive: true });

        const fileName = parse(filePath).name;
        const pathDestinationFile = resolve(destinationPath, `${fileName}.br`);
        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(pathDestinationFile);
        const brotli = createBrotliCompress();

        await pipeline(readStream, brotli, writeStream);
    } catch (error) {
        rl.write(`Operation failed: ${error.message}\n`);
    }
};

export default compress;
