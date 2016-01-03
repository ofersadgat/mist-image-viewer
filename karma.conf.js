module.exports = function(config) {
  config.set({

    /**
     * These are the files required to run the tests.
     *
     * The `Function.prototype.bind` polyfill is required by PhantomJS
     * because it uses an older version of JavaScript.
     */
    files: [
      './tests/**/*.js'
    ],

    /**
     * The actual tests are preprocessed by the karma-webpack plugin, so that
     * their source can be properly transpiled.
     */
    preprocessors: {
      './tests/**/*.js': ['webpack']
    },

    /**
     * Available browsers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: ['Chrome_without_security'],

    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    },

    /**
     * Use Mocha as the test framework, Sinon for mocking, and
     * Chai for assertions.
     */
    frameworks: ['mocha'],

    /**
     * The configuration for the karma-webpack plugin.
     * This is very similar to the main webpack.local.config.js.
     */
    webpack: require('./webpack.base.config'),

    /**
     * Turn off verbose logging of webpack compilation.
     */
    webpackMiddleware: {
      noInfo: true
    },

    singleRun: false,

    /**
     * Array of plugins used
     */
    plugins: [
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-webpack'
    ],

  });
};
