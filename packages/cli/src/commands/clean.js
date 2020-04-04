'use strict';

const rimraf = require('rimraf');
const spawn = require('cross-spawn');
const which = require('npm-which')(__dirname);

async function clean({ sources = [] }) {
  const rimraf = which.sync('rimraf');
  spawn(rimraf, sources, {
    stdiot: 'inherit',
    cwd: process.cwd(),
  });
}

module.exports = {
  command: 'clean <sources...>',
  desc: 'alias for rimraf',
  handler: clean,
};
