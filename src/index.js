"use strict";

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var plugins = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var del = require('del');
var objectAssign = require('object-assign');
var _ = require('lodash');

function lintTask(src, opts) {
  return function() {
    opts = objectAssign({
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
    }, opts);

    return gulp.src(src)
      .pipe(plugins.eslint(opts.eslint));
  };
}

function jsTask(src, dst, opts) {
  return function() {
    opts = objectAssign({
      outFilename: 'scripts.js',
      babel: {}
    }, opts);

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
    opts = objectAssign({
      outFilename: 'styles.css',
      sass: {}
    }, opts);

    return gulp.src(src)
      .pipe(plugins.plumberNotifier())
      .pipe(plugins.sass(opts.sass))
      .pipe(plugins.rename(opts.outFilename))
      .pipe(gulp.dest(dst));
  }
}

function cleanTask(src) {
  return function(callback) {
    del(Array.isArray(src) ? src : [ src ], callback);
  };
}

function distTask(src, dst, opts) {
  return function() {
    opts = objectAssign({
      copy: { base: './' }
    }, opts);

    return gulp.src(src, opts.copy)
      .pipe(gulp.dest(dst));
  };
}

function zipTask(src, dst, opts) {
  return function() {
    opts = objectAssign({
      outFilename: 'build.zip'
    }, opts);

    return gulp.src(src)
      .pipe(plugins.zip(opts.outFilename))
      .pipe(gulp.dest(dst));
  };
}

module.exports = {
  js: jsTask,
  lint: lintTask,
  sass: sassTask,
  dist: distTask,
  clean: cleanTask,
  zip: zipTask
};
