'use strict';

const packages = ['accordion'];

module.exports = {
  addons: [
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: /-story\.js$/,
        },
      },
    },
  ],
  stories: packages.flatMap((pkg) => [
    `../../${pkg}/src/**/*-story.js`,
    `../../${pkg}/src/**/*.stories.mdx`,
  ]),
};
