const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Load the mode from the command line arg
const mode = process.argv[process.argv.findIndex(a => a === '--mode') + 1];

// Load specific configs for dev vs prod builds
const ENV = (mode === 'production' && 'prod') || (process.env.NODE_ENV === 'production' && 'prod') || 'dev';

// eslint-disable-next-line import/no-dynamic-require
const env = require(`./webpack.config.${ENV}.js`);

const base = {
  entry: path.resolve(__dirname, '../', 'src/index'),

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../', 'dist/webpack/'),
  },

  plugins: [new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['*.{js,map}'] })],

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

  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

module.exports = merge(base, env);
