const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const URLImportPlugin = require('webpack-external-import/webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',

  entry: path.resolve(__dirname, '../', 'src/index'),

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../', 'public'),
  },

  plugins: [
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['*.{js,map,html}'] }),
    new URLImportPlugin({
      manifestName: 'consumer',
    }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, '../src/index.html') }),
  ],

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
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
    },
  },
};
