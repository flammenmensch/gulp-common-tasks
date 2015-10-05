"use strict";

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var reactify = require('reactify');
var plugins = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var _ = require('lodash');

function jsTask(src, dst, opts) {
  return function() {
    return browserify({ entries: src })
      .transform(babelify.configure({ optional: [ 'es7.objectRestSpread' ] }))
      .transform(reactify)
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(plugins.eslint())
      .pipe(gulp.dest(dst));

  }
}

function sassTask(src, dst, opts) {
  return function() {
    return gulp.src(source)
      .pipe(plugins.sass())
      .pipe(gulp.dest(dst));
  }
}

module.exports = {
  js: jsTask,
  sass: cssTask
};
