#gulp-common-tasks

##Installation
```
npm install git+https://github.com/flammenmensch/gulp-common-tasks.git
```

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

##API

###lint(source, options)
  * `source` - Source file(s) to lint
  * `options` - Additional options.
    * `eslint` - Custom eslint options

###js(source, destinationPath, options)
  * `source` - Source file (usually main `index.js` file)
  * `destinationPath` - Where to put compiled and bundled version
  * `options` - Additional options.
    * `outFilename` - Custom name for output file (default is `scripts.js`)
    * `babel` - Custom babel options

###sass(source, destinationPath, options)
  * `source` - Source file (normally main scss file which imports all other files)
  * `destinationPath` - Where to put compiled and bundled version
  * `options` - Additional options
    * `outFilename` - Custom name for output file (default is `styles.css`)
    * `sass` - Custom sass options
