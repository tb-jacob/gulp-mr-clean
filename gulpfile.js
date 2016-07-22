// Include gulp
var gulp = require('gulp');


// Concatenate & Minify JS
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('scripts', function () {
  return gulp.src(['src/js/*.js',
                  'src/js/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});



// Sass preprocessing
var sass = require('gulp-ruby-sass');

gulp.task('sass', function () {
  return sass(['src/scss/**/*.scss',
              'src/scss/*.scss'], {
      style: 'compressed'
    })
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});


// Image Optimization
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('build/img'));
});

// Watch
gulp.task('watch', function () {
  // Watch .js files
  gulp.watch(['src/js/*.js', 'src/js/**/*.js'], ['scripts']);
  // Watch .scss files
  gulp.watch('src/scss/**/*.scss', ['sass']);
  // Watch image files
  gulp.watch('src/images/**/*', ['images']);
});

// Default Task, show me what you can do
gulp.task('default', ['scripts', 'sass', 'images', 'watch']);