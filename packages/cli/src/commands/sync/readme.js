'use strict';

const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const createRemark = require('remark');
const monorepo = require('./remark/monorepo');

const packageDenyList = new Set([]);

async function run(workspace) {
  const { directory, packages } = workspace;
  const remark = createRemark().use(monorepo, {
    root: directory,
  });
  const localPrettierConfig = await prettier.resolveConfig(directory);
  const prettierOptions = {
    ...localPrettierConfig,
    parser: 'markdown',
  };

  return Promise.all(
    packages
      .filter((pkg) => !packageDenyList.has(pkg.packageJson.name))
      .map(async ({ packageFolder }) => {
        const README_PATH = path.join(packageFolder, 'README.md');
        if (!fs.existsSync(README_PATH)) {
          return;
        }

        const readme = await fs.readFile(README_PATH, 'utf8');
        const file = await process(remark, packageFolder, readme);
        await fs.writeFile(
          README_PATH,
          prettier.format(String(file), prettierOptions)
        );
      })
  );
}

function process(remark, cwd, contents) {
  return new Promise((resolve, reject) => {
    remark.process({ cwd, contents }, (error, file) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(file);
    });
  });
}

module.exports = {
  run,
};
