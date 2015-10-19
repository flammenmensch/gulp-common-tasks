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
    opts = _.defaultsDeep({}, opts, {
      outFilename: 'bundle.js',
      babel: {
        optional: [ 'es7.objectRestSpread' ]
      }
    });

    return browserify({ entries: [ src ] })
      .transform(babelify.configure(opts.babel))
      .transform(reactify)
      .bundle()
      .pipe(plugins.plumberNotifier())
      .pipe(source(opts.outFilename))
      .pipe(plugins.eslint())
      .pipe(gulp.dest(dst));
  }
}

function sassTask(src, dst, opts) {
  return function() {
    opts = _.defaultsDeep({}, opts, {
      sass: {}
    });
    
    var outFilename = opts.outFilename;
    var isRename = outFilename != null && outFilename !== '';
    
    return gulp.src(src)
      .pipe(plugins.plumberNotifier())
      .pipe(plugins.sass())
      .pipe(plugins.if(isRename, plugins.rename(opts.outFilename))
      .pipe(gulp.dest(dst));
  }
}

module.exports = {
  js: jsTask,
  sass: sassTask
};
