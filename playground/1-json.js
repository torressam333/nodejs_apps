const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

data.name = 'HELLO PERIL';
data.age = 44;

fs.writeFileSync('1-json.json', JSON.stringify(data));
