// fix: https://github.com/formium/tsdx/issues/338

const fs = require('fs-extra');
const path = require('path');

async function prebuild() {
  const filePath = path.resolve('./dist', 'index.js');
  let indexStr = await fs.readFile(filePath, {
    encoding: 'utf-8',
  });
  indexStr = `#!/usr/bin/env node

  ${indexStr}`;

  fs.writeFileSync(filePath, indexStr);
  return indexStr;
}

prebuild();
