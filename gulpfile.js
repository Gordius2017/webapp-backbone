var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var path = require('path');

var $ = require('gulp-load-plugins')();
var del = require('del');

gulp.task('analyze', function(){
    gulp.src(['src/**/*.js', 'gulpfile.js', '!src/vendor/**/*.js', '!src/assets/js/*.js'])
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        .pipe($.jshint.reporter('fail'))
        .pipe($.jscs())
        .pipe($.jscs.reporter())
        .pipe($.jscs.reporter('fail'));
});

gulp.task('inject', function(){
    var injectJS = gulp.src(['src/app/**/*.js','src/assets/js/*.js'])
        .pipe($.angularFilesort());

    var injectCSS = gulp.src('src/styles/*css');

    return gulp.src('src/index.html')
        .pipe(wiredep({exclude: []}))
        .pipe($.inject(injectJS, {relative: true}))
        .pipe($.inject(injectCSS, {relative: true}))
        .pipe(gulp.dest('src'));
});

gulp.task('serve', ['inject', 'analyze'] , function(){
    gulp.src('src')
        .pipe($.serverLivereload({
            livereload: true,
            open: true
        }));
});

gulp.task('clean', function () {
    return del([path.join('build', '/')]);
});

gulp.task('build', ['inject', 'analyze'], function(){
    return gulp.src('src/index.html')
        .pipe($.useref())
        .pipe($.if('*.js', $.ngAnnotate()))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cleanCss()))
        .pipe(gulp.dest('build'));
});