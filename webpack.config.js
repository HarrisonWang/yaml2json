const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist'),
  },
  target: 'webworker',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
};