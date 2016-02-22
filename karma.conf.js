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

  if (process.env.COVERAGE) config.set({
    browserify: {debug: true, transform: [istanbul, babelify]},
    reporters: ['progress', 'coverage']
  })

  if (process.env.COVERAGE && process.env.TRAVIS) config.set({
    reporters: ['progress', 'coverage', 'coveralls'],
    coverageReporter: {type: 'lcov'}
  })
}
