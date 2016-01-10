#gulp-common-tasks

##Usage

```javascript
var gulp = require('gulp');
var commonTasks = require('gulp-common-tasks');

gulp.task('lint', commonTasks.lint('js/**/*.js'));
gulp.task('js', [ 'lint' ], commonTasks.js('js/index.js', 'dist/js'));
gulp.task('css', commonTasks.sass('sass/all.scss', 'dist/css'));

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', [ 'js' ]);
  gulp.watch('sass/**/*.scss', [ 'css' ]);
});
```
