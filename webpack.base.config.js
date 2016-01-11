
var JsonpTemplatePlugin  = require('webpack/lib/JsonpTemplatePlugin');
var FunctionModulePlugin = require('webpack/lib/FunctionModulePlugin');
var NodeTargetPlugin     = require('webpack/lib/node/NodeTargetPlugin');
var NodeTemplatePlugin   = require('webpack/lib/node/NodeTemplatePlugin');
var LoaderTargetPlugin   = require('webpack/lib/LoaderTargetPlugin');

var path                 = require('path');
var webpack              = require('webpack');
var NpmPlugin            = require('npm-webpack');


var webpackNode = {
  // do not include poly fills...
  console: false,
  process: false,
  global: false,
  buffer: false,
  __filename: false,
  __dirname: false
};

var webpackOutput = {
	path: path.join(__dirname, '/dist'),
	filename: '[name].js'
};

/**
 * This is the Webpack configuration file for local development. It contains
 * local-specific configuration such as the React Hot Loader, as well as:
 * - The entry point of the application
 * - Where the output file should be
 * - Which loaders to use on what files to properly transpile the source
 * For more information, see: http://webpack.github.io/docs/configuration.html
 */
module.exports = {

  // Efficiently evaluate modules with source maps
  devtool: 'inline-source-map',

  entry: {
    app: [
      './src/app.js'
    ]
  },

  // This will not actually create a bundle.js file in ./build. It is used
  // by the dev server for dynamic hot loading.
  output: webpackOutput,

  // Necessary plugins for hot load
  plugins: [
    new NpmPlugin()
  ],

  // Transform source code using Babel and React Hot Loader
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader']
      }
    ]
  },

  target: function(compiler) {
    compiler.apply(
        new JsonpTemplatePlugin(webpackOutput),
        new FunctionModulePlugin(webpackOutput),
        new NodeTemplatePlugin(webpackOutput),
        new NodeTargetPlugin(webpackNode),
        new LoaderTargetPlugin('web')
    );
  },

  node: webpackNode,

  // Automatically transform files with these extensions
  resolve: {
    extensions: ['', '.js']
  }
};
