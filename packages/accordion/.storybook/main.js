'use strict';

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
    '../src/**/*-story.js',
    '../src/**/*.stories.mdx',
  ],
};