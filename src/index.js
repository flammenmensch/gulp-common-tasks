"use strict";

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var plugins = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var del = require('del');
var objectAssign = require('object-assign');
var runSequence = require('run-sequence');

function lintTask(src, opts) {
  return function() {
    opts = objectAssign({
      eslint: {
        extends: 'eslint:recommended',
        env: {
          browser: true,
          node: true,
          es6: true
        },
        ecmaVersion: 7,
        ecmaFeatures: {
          jsx: true
        }
      }
    }, opts);

    return gulp.src(src)
      .pipe(plugins.eslint(opts.eslint))
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslint.failAfterError());
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
  return function() {
    return del(Array.isArray(src) ? src : [ src ]);
  };
}

function copyTask(src, dst, opts) {
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

function asSequence() {
  var args = Array.prototype.slice.call(arguments);

  return function() {
    return runSequence.apply(this, args);
  };
}

module.exports = {
  js: jsTask,
  lint: lintTask,
  sass: sassTask,
  copy: copyTask,
  clean: cleanTask,
  zip: zipTask,
  asSequence: asSequence
};
