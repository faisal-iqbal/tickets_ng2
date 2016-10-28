const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const gnf = require('gulp-npm-files');
const copyDestination = './dist'
// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del(copyDestination+'/**/*');
});

// copy static assets - i.e. non TypeScript compiled sources to build folder
gulp.task('copy:assets', ['clean'], function() {
    return gulp.src(['app/**/*', 'index.html', 'systemjs.config.js', '!app/**/*.ts'], { base : './' })
        .pipe(gulp.dest(copyDestination))
});

// Copy dependencies to build/node_modules/
// TODO: This is a temporary solution and not a good one. Use webpack or browserify at later stage.
gulp.task('copy:libs', function() {
   return gulp.src(gnf(), {base:'./'}).pipe(gulp.dest(copyDestination));
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
    return gulp
        .src('app/**/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest(copyDestination +'/app'));
});

gulp.task('build', ['compile', 'copy:libs', 'copy:assets']);