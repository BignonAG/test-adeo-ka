('use strict');

import dataService from './src/services/dataService.js';
import program from './src/program.js';

// USAGE: node app.js --filter=[PATTERN] OR node app.js -f=[PATTERN]
// USAGE: node app.js --count OR node app.js -c

const main = async () => {
  try {
    program
      .option('--filter', '-f', (value) => {
        if (!value) {
          throw new Error('filter value is required');
        }
        const res = dataService.filterByAnimal(value).data;
        console.log(res);
      })
      .option('--count', '-c', () => {
        const res = dataService.count().data;
        console.log(res);
      })
      .parseArgs();
  } catch (err) {
    throw err;
  }
};

main();
