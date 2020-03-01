var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var minify = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify'); 
var fileinclude = require('gulp-file-include');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var prefixer = require('gulp-autoprefixer');
var reload = browserSync.reload;

var path = 
{
    build: 
    {
        css: './build/css/', 
        js: './build/js/',
        html: './build',
        img: './build/img/', 
        fonts: './build/fonts/'
    }, 
    watch: 
    {
        html: 'src/**/*.html', 
        style: 'src/style/**/*.*', 
        js: 'src/js/**/*.js',
        img: 'src/img/**/*.*', 
        fonts: 'src/fonts/**/*.*' 
    }, 
    clean: './build'
}

var config = 
{
    server: 
    {
        baseDir: './build'
    }, 
    tunnel: false, 
    host: 'localhost', 
    port: 3000, 
    logPrefix: 'Devil'

}

gulp.task('html:build', function(done) 
{
    gulp.src(path.watch.html) 
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
          }))
        .pipe(gulp.dest(path.build.html))
        .pipe(livereload());
    done();
});

gulp.task('js:build', function(done) 
{
    gulp.src(path.watch.style) 
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
          }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(livereload());
    done();
});

gulp.task('style:build', function(done)
{
    gulp.src(path.watch.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(minify())
        .pipe(prefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(livereload());
    done();
}
);

gulp.task('image:build', function(done) 
{
    gulp.src(path.watch.img)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(path.build.img))
        .pipe(livereload());
    done();
});

gulp.task('fonts:build', function(done) 
{
    gulp.src(path.watch.fonts)
        .pipe(path.build.fonts)
        .pipe(livereload());
    done();
});

gulp.task('default', function(done) 
{
    livereload.listen();
    gulp.watch(path.watch.html, gulp.series('html:build'));
    gulp.watch(path.watch.style, gulp.series('style:build'));
    //gulp.watch(path.watch.html, gulp.series('html:build'));
    browserSync(config);
    done();
});

