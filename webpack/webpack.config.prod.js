const TerserPlugin = require('terser-webpack-plugin');
const URLImportPlugin = require('webpack-external-import/webpack');

const pkg = require('../package.json');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          comments: true,
        },
        extractComments: false,
      }),
    ],

    runtimeChunk: {
      name: 'manifest',
    },

    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
    },
  },
  plugins: [
    new URLImportPlugin({
      manifestName: pkg.name,
    }),
  ],
};
