const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');

test('production CSS retains site and dynamic selectors when Hugo runs PostCSS from site/', () => {
  const projectRoot = path.resolve(__dirname, '../..');
  const code = `
    const postcss = require(${JSON.stringify(require.resolve('postcss'))});
    const config = require(${JSON.stringify(path.join(projectRoot, 'postcss.config.js'))});
    const css = '.cms {color: red} .checkout-options {display: grid} .DocSearch-Button {color: blue} .unused-regression-fixture {color: pink}';
    postcss(config.plugins).process(css, {from: undefined})
      .then(result => process.stdout.write(result.css))
      .catch(error => {process.stderr.write(error.message); process.exitCode = 1;});
  `;
  const css = execFileSync(process.execPath, ['-e', code], {
    cwd: path.join(projectRoot, 'site'),
    env: { ...process.env, NODE_ENV: 'production' },
    encoding: 'utf8',
  });
  assert.match(css, /\.cms/);
  assert.match(css, /\.checkout-options/);
  assert.match(css, /\.DocSearch-Button/);
  assert.doesNotMatch(css, /\.unused-regression-fixture/);
});
