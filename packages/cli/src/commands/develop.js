'use strict';

const spawn = require('cross-spawn');
const fs = require('fs-extra');
const which = require('npm-which')(__dirname);
const os = require('os');
const path = require('path');
const format = require('pretty-format');

async function develop({ source, build }) {
  const cwd = process.cwd();
  const directory = path.resolve(cwd, source);
  const storybookDirectory = path.resolve(cwd, './.storybook');
  const filepath = path.join(storybookDirectory, 'main.js');
  const relativeSourcePath = path.relative(storybookDirectory, directory);
  const storybookConfig = `'use strict';

module.exports = {
  addons: [
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: /-story.js$/,
        },
      },
    },
  ],
  stories: [
    '${relativeSourcePath}/**/*-story.js\',
    '${relativeSourcePath}/**/*.stories.mdx',
  ],
};`;

  await fs.ensureFile(filepath);
  await fs.writeFile(filepath, storybookConfig);

  const bin = build ? 'build-storybook' : 'start-storybook';
  const storybook = which.sync(bin);
  spawn(storybook, ['-c', storybookDirectory], {
    stdio: 'inherit',
    cwd,
  });
}

module.exports = {
  command: 'develop <source>',
  description: 'use storybook to develop your component',
  builder: {
    build: {
      default: 'storybook-static',
      describe: 'build the given storybook and output to the given directory',
      type: 'string',
    },
  },
  handler: develop,
};
