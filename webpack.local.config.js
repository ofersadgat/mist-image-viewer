var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var base = require('./webpack.base.config');

var webpackOutput = _.extend(base.output, {
	publicPath: '//localhost:8000/',
});

/**
 * This is the Webpack configuration file for local development. It contains
 * local-specific configuration such as the React Hot Loader, as well as:
 * - The entry point of the application
 * - Where the output file should be
 * - Which loaders to use on what files to properly transpile the source
 * For more information, see: http://webpack.github.io/docs/configuration.html
 */
module.exports = _.extend(base, {

  entry: {
    app: [
      'webpack-dev-server/client?//localhost:8000',
      'webpack/hot/only-dev-server',
    ].concat(base.entry.app)
  },

  // This will not actually create a bundle.js file in ./build. It is used
  // by the dev server for dynamic hot loading.
  output: webpackOutput,

  // Necessary plugins for hot load
  plugins: base.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ]),

  target: function(compiler) {
    compiler.apply(
        new JsonpTemplatePlugin(webpackOutput),
        new FunctionModulePlugin(webpackOutput),
        new NodeTemplatePlugin(webpackOutput),
        new NodeTargetPlugin(base.node),
        new LoaderTargetPlugin('web')
    );
  },
});
