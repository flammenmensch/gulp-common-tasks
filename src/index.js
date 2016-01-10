"use strict";

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var plugins = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var _ = require('lodash');

function lintTask(src, opts) {
  return function() {
    opts = _.defaultsDeep({}, opts, {
      eslint: {
        ecmaFeatures: {
          jsx: true,
          blockBindings: true,
          classes: true,
          arrowFunctions: true,
          defaultParams: true,
          destructuring: true,
          forOf: true,
          restParams: true,
          templateStrings: true,
          experimentalObjectRestSpread: true,
          objectLiteralShorthandMethods: true,
          objectLiteralShorthandProperties: true,
          modules: true
        }
      }
    });

    return gulp.src(src)
      .pipe(plugins.eslint(opts.eslint));
  };
}

function jsTask(src, dst, opts) {
  return function() {
    opts = _.defaultsDeep({}, opts, {
      outFilename: 'scripts.js',
      babel: {}
    });

    return browserify({ entries: [ src ] })
      .transform(babelify.configure(opts.babel))
      .bundle()
      .pipe(plugins.plumberNotifier())
      .pipe(source(opts.outFilename))
      .pipe(gulp.dest(dst));
  }
}

function sassTask(src, dst, opts) {
  return function() {
    opts = _.defaultsDeep({}, opts, {
      outFilename: 'styles.css',
      sass: {}
    });

    return gulp.src(src)
      .pipe(plugins.plumberNotifier())
      .pipe(plugins.sass(opts.sass))
      .pipe(plugins.rename(opts.outFilename))
      .pipe(gulp.dest(dst));
  }
}

module.exports = {
  js: jsTask,
  lint: lintTask,
  sass: sassTask
};
