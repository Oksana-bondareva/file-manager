import fs from 'fs';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { join, resolve, parse } from 'path';

const decompress = async (args, currentDir, rl) => {
    if (args.length !== 2) {
        console.log('You must write decompress <path_to_file> <path_to_destination>');
        return;
    }

    const filePath = join(currentDir, args[0]);
    const destinationPath = join(currentDir, args[1]);

    try {
        await fs.promises.access(destinationPath, fs.constants.F_OK);

        const { name, ext } = parse(filePath);
        const pathDestinationFile = resolve(destinationPath, ext === '.br' ? name : `${name}${ext}`);
        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(pathDestinationFile);
        const brotliDecompress = createBrotliDecompress();

        await pipeline(readStream, brotliDecompress, writeStream);

    } catch (error) {
        rl.write(`Operation failed: ${error.message}`);
    }
};

export default decompress;

