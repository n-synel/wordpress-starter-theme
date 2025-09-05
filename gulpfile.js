const gulp = require('gulp');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const prefix = require('gulp-autoprefixer');
const csso = require('gulp-csso');

const isProd = false;

function styles() {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(gulpIf(isProd, prefix()))
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(gulpIf(isProd, csso({
      forceMediaMerge: true
    })))
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(gulp.dest('./assets/css/'));
}

function watch() {
  gulp.watch('./assets/scss/**/*.scss', gulp.series(styles));
}

exports.default = gulp.series(styles, gulp.parallel(watch));
