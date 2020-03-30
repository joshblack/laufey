'use strict';

module.exports = () => ({
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        modules: false,
        targets: {
          browsers: ['extends browserslist-config-laufey'],
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'dev-expression',
    '@babel/plugin-proposal-class-properties',
    'annotate-pure-calls',
  ],
});
