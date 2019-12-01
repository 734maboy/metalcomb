module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    files: ['test/**/*.tspec.js'],

    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },

    reporters: ['spec'],

    browsers: ['Chrome']
  })
}
