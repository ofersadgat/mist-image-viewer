var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var base = require('./webpack.base.config');

/**
 * Webpack configuration file for production.
 */
module.exports = _.extend(base, {
  output: _.extend(base.output, {
    publicPath: '/',
  }),
  plugins: base.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ]),
});
