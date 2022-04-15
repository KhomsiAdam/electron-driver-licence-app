const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const assets = ['images'];
module.exports = [new ForkTsCheckerWebpackPlugin(),
new CopyWebpackPlugin({
  patterns: [
    {
      from: path.join(__dirname, 'src/assets'),
      to: 'assets/',
    },
  ],
}),];
