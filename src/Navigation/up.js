import { join } from 'path';
import path from 'path';

const up = (currentDir) => {
    if (currentDir !== path.parse(currentDir).root) {
        return join(currentDir, '..');
    }
    return currentDir;
}

export default up;
