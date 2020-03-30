'use strict';

const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const fs = require('fs');
const path = require('path');
const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');
const sourcemaps = require('rollup-plugin-sourcemaps');
const packageJson = require('./package.json');

const COMMANDS_DIR = path.resolve(__dirname, './src/commands');
const commands = fs
  .readdirSync(COMMANDS_DIR)
  .filter((name) => {
    return name !== '.DS_Store';
  })
  .map((name) => {
    return [path.basename(name, '.js'), path.join(COMMANDS_DIR, name)];
  });

const input = {
  cli: path.join(__dirname, 'src/cli.js'),
};

for (const [command, filepath] of commands) {
  input[command] = filepath;
}

module.exports = {
  input,
  external: [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.devDependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
  ],
  plugins: [
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      babelrc: false,
      exclude: /node_modules/,
      presets: ['@laufey/babel-preset-laufey/node'],
    }),
    sourcemaps(),
    terser({
      sourcemap: true,
    }),
  ],
  output: [
    {
      dir: 'lib',
      format: 'cjs',
    },
  ],
};
