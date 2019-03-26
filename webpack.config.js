const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  watchOptions: {
    ignored: ['server', 'node_modules']
  },
  mode: "development"
};
