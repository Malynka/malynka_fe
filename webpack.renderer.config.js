const path = require('path');
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

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
    alias: {
      '@mui/styled-engine': createAliasPath('node_modules/@mui/styled-engine-sc'),
      '@hooks': createAliasPath('src/hooks'),
      '@pages': createAliasPath('src/pages'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
