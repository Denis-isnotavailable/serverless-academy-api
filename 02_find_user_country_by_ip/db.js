const fs = require('fs').promises;


async function readFile() {
    try {
        const data = await fs.readFile('./IP2LOCATION-LITE-DB1.CSV', { encoding: "utf8" });
        return data.split('\n');

    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
};

function csvParse(str) {
    const itemArr = str.replaceAll('"', '').split(',');

    const start = itemArr[0];
    const end = itemArr[1];
    const country = itemArr[3].replace('\r', '');

    return { start, end, country };
}

async function findCountry(ip) {
    const dataArray = await readFile();
    const ipNumber = ip
        .split('.')
        .reduce((acc, part) => { return parseInt(part, 10) + acc * 256 }, 0);
       
    const res = dataArray.find(item => {
        const { start, end } = csvParse(item);
        if (ipNumber >= start && ipNumber <= end) return item;
    });

    const { country } = csvParse(res);

    return { ipNumber, country };
}

module.exports = findCountry;