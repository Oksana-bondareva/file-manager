import os from 'os';

const osInfo = (args, rl) => {
    if (args.length !== 1) {
        rl.write('You must write os --EOL | --cpus | --homedir | --username | --architecture\n');
        return;
    }

    switch (args[0]) {
        case '--EOL':
            rl.write(`${JSON.stringify(os.EOL)}\n`);
            break;
        case '--cpus':
            const cpus = os.cpus();
            cpus.forEach((cpu, index) => {
                rl.write(`CPU ${index + 1}: ${cpu.model} - ${cpu.speed / 1000} GHz\n`);
            });
            break;
        case '--homedir':
            rl.write(`${os.homedir()}\n`);
            break;
        case '--username':
            rl.write(`${os.userInfo().username}\n`);
            break;
        case '--architecture':
            rl.write(`${os.arch()}\n`);
            break;
        default:
            rl.write('Invalid input\n');
    }
};

export default osInfo;
