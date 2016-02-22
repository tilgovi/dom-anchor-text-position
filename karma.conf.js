var babelify = require('babelify')
var istanbul = require('browserify-babel-istanbul')

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    browserify: {debug: true, transform: [babelify]},
    frameworks: ['browserify', 'chai', 'fixture', 'mocha'],
    files: [
      'test/*.js',
      'test/fixtures/*.html'
    ],
    preprocessors: {
      'test/*.js': ['browserify'],
      'test/fixtures/*.html': ['html2js']
    },
    reporters: ['progress']
  })

  if (process.env.npm_config_coverage) config.set({
    browserify: {debug: true, transform: [istanbul, babelify]},
    reporters: ['progress', 'coverage'],
    coverageReporter: {type: 'lcov'}
  })

  if (process.env.TRAVIS) config.set({
    reporters: ['progress', 'coverage', 'coveralls']
  })
}
