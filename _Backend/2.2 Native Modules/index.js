
const { readFile } = require('fs').promises;

async function run() {

    try {
        // 'utf8' ensures you get a string back instead of a raw Buffer packet
        const data = await readFile('./message.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

run();
