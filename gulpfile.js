var js  = ['builds/development/assets/js/*.js'];
    css  = ['builds/development/assets/css/*.css'];
    img  = ['builds/development/assets/img/*.png','builds/development/assets/img/*.jpg'];
    sass = ['builds/development/assets/sass/*.sass'];

var gulp = require('gulp'),
    gulp_sass = require('gulp-sass'), //"Convert" Sass
    stripCssComments = require('gulp-strip-css-comments'), //Take comments from CSS
    cssmin = require("gulp-cssmin"), //Minify CSS
    uglify = require("gulp-uglify"), //Unreadable JS
    concat = require("gulp-concat"), //Concat archives
    watch = require('gulp-watch'), //Watch for changes
    imagemin = require('gulp-tinypng');//Reduce images size

//Convert Sass
gulp.task('sass', function () {
  gulp.src(sass)
  .pipe(gulp_sass().on('error', gulp_sass.logError))
  .pipe(gulp.dest('builds/development/assets/css'));
});

//Take comments and minify Css
gulp.task('minify-css', function(){
  gulp.src(css)
  .pipe(concat('style.min.css'))
  .pipe(stripCssComments({all: true}))
  .pipe(cssmin())
  .pipe(gulp.dest('builds/production/assets/css'));
});

// Minify images of archive taking geolocation archives
gulp.task('tiny-img', function () {
  gulp.src(img)
  .pipe(imagemin('mfpBk3NMJGQqA2AxONcPo0Yrs7omkZMF'))
  .pipe(gulp.dest('builds/production/assets/img'));
});
//Minify Js archives
gulp.task('minify-js', function () {
  gulp.src(js)
  .pipe(concat('script.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('builds/production/assets/js'));
});

gulp.task('default',['minify-js','tiny-img','sass','minify-css']);

gulp.task('watch', function() {
  gulp.watch(sass, ['sass']);
  gulp.watch(css, ['minify-css']);
  gulp.watch(js, ['minify-js']);
  gulp.watch(img, ['tiny-img']);
});
