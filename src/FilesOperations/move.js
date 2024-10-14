import fs from 'fs';
import { join } from 'path';
import { pipeline } from "stream/promises";

const mv = async (args, currentDir, rl) => {
    if (args.length !== 2) {
        rl.write('You must write cp <path_to_file> <path_to_new_directory>\n');
        return;
    }

    const currentFilePath = join(currentDir, args[0]);
    const copyFilePath = join(currentDir, args[1], args[0]);

    fs.access(currentFilePath, fs.constants.F_OK, (error) => {
        if (error) {
            rl.write('Operation failed: file does not exist\n');
        } else {
            const readStream = fs.createReadStream(currentFilePath);

            const handleError = (error) => {
                rl.write(`Operation failed: ${error.message}\n`);
            };

            readStream.on('error', handleError);
            readStream.on('open', () => {
                const writeStream = fs.createWriteStream(copyFilePath);

                writeStream.on('error', handleError);
                writeStream.on('close', async () => {
                    try {
                        await fs.promises.unlink(currentFilePath);
                    } catch (error) {
                        rl.write(`Failed to delete source file: ${error.message}\n`);
                    }
                });
                pipeline(readStream, writeStream).catch(handleError);
            });
        }
    });
};

export default mv;