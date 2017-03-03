'use strict';

// requires
var gulp         = require('gulp');
var connect      = require('gulp-connect');
var rename       = require('gulp-rename');
var watch        = require('gulp-watch');





var babel        = require('gulp-babel');

var browserify   = require('browserify');
var uglify       = require('gulp-uglify');
var babelify     = require('babelify');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var fs           = require('fs');

var sourcemaps   = require('gulp-sourcemaps');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// error handler
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('connect', function() {
  connect.server({
    root: './',
    port: 8888,
    livereload: true,
    index: './test/index.html'
  });
});

gulp.task('css', function() {
  var processors = [
    autoprefixer({browsers: ['last 3 versions']})
  ];

  gulp.src('./src/box4js.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors)).on('error', handleError)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));

  return gulp.src('./src/box4js.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postcss(processors)).on('error', handleError)
        .pipe(rename('box4js.min.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

gulp.task('js', function() {
  return gulp.src('./src/box4js.js')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(babel({
          presets: ['es2015', 'es2016', 'es2017'],
          plugins: [
            'transform-decorators-legacy',
            'transform-class-properties',
            [
              "transform-runtime", {
                "polyfill": false, 
                "regenerator": true
              }
            ]
          ]
        }))
        .pipe(gulp.dest('./dist'))
        
        .pipe(uglify({
          compress: true,
          output: {
            beautify: false
          }
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(rename('box4js.min.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
        
});

watch('./src/*.js',      () => {gulp.start('js');});
watch('./src/*.scss',    () => {gulp.start('css');});

gulp.task('default', ['connect', 'css', 'js']);