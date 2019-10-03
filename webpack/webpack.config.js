const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Load specific configs for dev vs prod builds
const ENV = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

// eslint-disable-next-line import/no-dynamic-require
const env = require(`./webpack.config.${ENV}.js`);

const base = {
  entry: path.resolve(__dirname, '../', 'src/index'),

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../', 'dist/'),
  },

  plugins: [new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['*.js'] })],

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
};

module.exports = merge(base, env);
