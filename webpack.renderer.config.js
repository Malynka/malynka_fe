const path = require('path');
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const tsconfig = require('./tsconfig.json');

const createAliasPath = (p) => path.join(__dirname, p);

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    alias: Object.fromEntries(Object.entries(tsconfig.compilerOptions.paths).map(([key, value]) => [key, createAliasPath(value[0])])),
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
