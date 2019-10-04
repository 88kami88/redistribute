const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const URLImportPlugin = require('webpack-external-import/webpack');
const webpack = require('webpack');

const pkg = require('../../package.json');

module.exports = {
  entry: path.resolve(__dirname, '../', 'src/index'),

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../', 'dist/webpack/'),
  },

  plugins: [
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['*.{js,map}'] }),
    new URLImportPlugin({
      manifestName: pkg.name,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
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

  // externals: {
  //   react: {
  //     commonjs: 'react',
  //     commonjs2: 'react',
  //     amd: 'react',
  //     root: 'React',
  //   },
  // },

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

// module.exports = merge(base, env);
