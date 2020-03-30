'use strict';

const cli = require('yargs');
const packageJson = require('../package.json');

async function main({ argv }) {
  cli
    .scriptName(packageJson.name)
    .version(packageJson.version)
    .usage('Usage: $0 [options]');

  cli
    .commandDir('commands')
    .strict()
    .fail((message, error, yargs) => {
      if (error) {
        if (error.stderr) {
          console.error(error.stderr);
          process.exit(1);
        }
        console.log(error);
        process.exit(1);
      }
      console.log(message);
      console.log(yargs.help());
      process.exit(1);
    })
    .parse(argv.slice(2)).argv;
}

module.exports = main;
