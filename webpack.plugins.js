const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [new ForkTsCheckerWebpackPlugin(),
new CopyWebpackPlugin({
  patterns: [
    {
      from: path.join(__dirname, 'src/assets/'),
      to: 'assets/',
    },
    {
      from: path.resolve(__dirname, 'src/assets/'),
      to: path.resolve(__dirname, '.webpack/renderer/main_window/assets/')
    }
  ],
}),];
