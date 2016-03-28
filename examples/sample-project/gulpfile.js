"use strict";

var gulp = require('gulp');
var tasks = require('../../src/');

gulp.task('lint', tasks.lint('js/**/*.js'));

gulp.task('js', tasks.js('js/index.js', './', {
  outFilename: 'bundle.js'
}));

gulp.task('css', tasks.sass('sass/main.scss', './', {
  outFilename: 'styles.css'
}));

gulp.task('compile', [ 'js', 'css' ]);

gulp.task('copy', tasks.copy([ 'index.html', 'bundle.js', 'styles.css' ], './dist'));

gulp.task('clean', tasks.clean('./dist/*'));

gulp.task('zip', tasks.zip('./dist/**/*', './', {
  outFilename: 'bundle.zip'
}));

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', tasks.asSequence('lint', 'js'));
  gulp.watch('sass/**/*.scss', [ 'css' ]);
});

gulp.task('build', tasks.asSequence('clean', 'compile', 'copy', 'zip'));
