const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../', 'src/index'),

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../', 'public'),
  },

  plugins: [new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['*.{js,map,html}'] }), new HtmlWebpackPlugin()],

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
