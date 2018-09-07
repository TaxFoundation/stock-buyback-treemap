const dsv = require('d3-dsv');
const fs = require('fs');

const input = './src/data/data.csv';
const output = './src/data/data.json';

const updateData = () => {
  try {
    const doc = dsv.csvParse(fs.readFileSync(input, 'utf8'));
    fs.writeFileSync(output, JSON.stringify(doc, null, 2));
    console.log('Update complete.');
  } catch (e) {
    console.log(`Data update failed: ${e}`);
  }
};

const beginTheWatch = () => {
  console.log('Inital new data building.');
  updateData();
  if (process.argv.includes('--watch')) {
    console.log('Watching for new changes...');
    fs.watch(input, { encoding: 'utf8' }, (event, file) => {
      console.log('Updating data...');
      updateData();
    });
  }
};

console.log('Removing old data.');

fs.unlink(output, err => {
  if (err) {
    console.log('JSON file did not exist.');
  } else {
    console.log('Old data deleted.');
  }
  beginTheWatch();
});
