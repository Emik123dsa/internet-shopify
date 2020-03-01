var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var broswerSync = require('broswer-sync');
var minify = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify'); 
var rigger = require('gulp-rigger');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');

gulp.task('default', function(done) 
{
    console.log('gulp');
    done();
});

