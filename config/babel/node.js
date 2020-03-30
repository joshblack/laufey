'use strict';

module.exports = () => ({
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        modules: false,
        targets: {
          node: 12,
        },
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-class-properties', 'annotate-pure-calls'],
});
