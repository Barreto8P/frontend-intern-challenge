var js  = ['builds/development/assets/js/*.js'];
var css  = ['builds/development/assets/css/*.css'];
var img  = ['builds/development/assets/img/*.png','builds/development/assets/img/*.jpg'];

var gulp = require('gulp'),
    uglify = require("gulp-uglify"), //Unreadable JS
    concat = require("gulp-concat"), //Concat archives
    watch = require('gulp-watch'), //Watch for changes
    cssmin = require("gulp-cssmin"), //Minify CSS
    stripCssComments = require('gulp-strip-css-comments'), //Take comments from CSS
    imagemin = require('gulp-tinypng');

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

gulp.task('default',['minify-js','tiny-img','minify-css']);

gulp.task('watch', function() {
    gulp.watch(css, ['minify-css']);
    gulp.watch(js, ['minify-js']);
    gulp.watch(img, ['tiny-img']);
});
