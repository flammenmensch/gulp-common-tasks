#gulp-common-tasks

[![dependencies](https://david-dm.org/bahmutov/xplain.png)](https://david-dm.org/bahmutov/xplain)

##Installation
```
npm i --save-dev gulp-common-tasks
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

See `examples` folder for complete list for features.

##API

###lint(source, options) - Lint JavaScript
  * `source` - Source file(s) to lint
  * `options` - Additional options
    * `eslint` - Custom eslint options

###js(source, destinationPath, options) - Compile JS files
  * `source` - Source file (usually main `index.js` file)
  * `destinationPath` - Where to put compiled and bundled version
  * `options` - Additional options
    * `outFilename` - Custom name for output file (default is `scripts.js`)
    * `babel` - Custom babel options

###sass(source, destinationPath, options) - Compile SCSS files
  * `source` - Source file (normally main scss file which imports all other files)
  * `destinationPath` - Where to put compiled and bundled version
  * `options` - Additional options
    * `outFilename` - Custom name for output file (default is `styles.css`)
    * `sass` - Custom sass options

###copy(source, destinationPath, options) - Copy files into specified folder
  * `source` - Source files to copy
  * `destinationPath` - Where to copy specified files
  * `options` - Additional options
    * `copy` - Current working dir (default is `{ base: './' }`)

###clean(source) - Clean specified folder
  * `source` - Path to remove all contents from

###zip(source, destinationPath, options) - Pack contents into ZIP archive
  * `source` - Source files
  * `destinationPath` - Where to put generated archive
  * `options` - Additional options
    * `outFilename` - Custom name for generated archive (default is `build.zip`)

###asSequence(...tasks) - Utility function to run tasks sequentially. Uses `run-sequence` module under the hood
  * `...tasks` - Tasks to run sequentially
