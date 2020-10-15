const { join } = require('path');
const resolve = require('rollup-plugin-node-resolve');
const multiInput = require('rollup-plugin-multi-input').default;
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');

const pkg = require('./package.json');
const files = require('./files.json');

const cwd = __dirname;

const resolutions = {
  globals: {
    react: 'Vue'
  },
  exports: 'named'
};

const commonPlugins = [
  resolve({
    preferBuiltins: false
  }),
  babel({
    babelrc: false,
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false
        }
      ]
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread'
    ]
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.VUE_ENV': JSON.stringify('browser')
  })
];
// https://stackoverflow.com/questions/60232288/cherry-pick-modules-with-rollup-and-es-modules#60235420
const baseConfig = [
  // 打包全部
  {
    input: join(cwd, './src/index.js'),
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        ...resolutions
      },
      {
        file: pkg.unpkg,
        format: 'umd',
        name: '@sinokit/utils',
        ...resolutions
      },
      {
        file: pkg.module,
        format: 'esm',
        ...resolutions
      }
    ],
    plugins: [...commonPlugins]
  },
  // 多入口打包，实现按需加载
  // https://www.npmjs.com/package/rollup-plugin-multi-input
  {
    input: [
      ...Object.keys(files).map(key => {
        return files[key].replace('./', './src/');
      })
    ],
    output: {
      format: 'esm',
      dir: 'dist'
    },
    plugins: [
      multiInput(),
      resolve({
        preferBuiltins: false
      }),
      ...commonPlugins
    ]
  }
];

module.exports = baseConfig;
