const { join } = require('path');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');

const cwd = __dirname;

const baseConfig = {
  input: join(cwd, 'lib/index.js'),
  output: {
    sourcemap: true,
    name: 'SinokitUtils',
    format: 'umd',
    file: join(cwd, 'dist/index.js')
  },
  plugins: [
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
  ]
};

module.exports = baseConfig;
