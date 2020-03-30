'use strict';

const { getWorkspace } = require('../workspace');

const tasks = {
  npm: require('./sync/npm'),
  'package.json': require('./sync/packageJson'),
  readme: require('./sync/readme'),
};

async function sync(args) {
  const workspace = await getWorkspace();
  const { target } = args;
  const tasksToRun = target === 'all' ? Object.keys(tasks) : [target];

  for (const name of tasksToRun) {
    const task = tasks[name];
    await task.run(workspace);
  }
}

module.exports = {
  command: 'sync [target]',
  desc: 'sync configuration files for packages in a workspace',
  builder(yargs) {
    yargs.positional('target', {
      describe: 'choose a target to sync',
      choices: ['all', 'npm', 'package.json', 'readme'],
      default: 'all',
    });
  },
  handler: sync,
};
