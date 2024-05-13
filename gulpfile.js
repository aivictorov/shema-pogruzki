// Gulp

const gulp = require('gulp');

// Plugins

const fs = require('fs');
const clean = require('gulp-clean');
const nunjucks = require('gulp-nunjucks');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const cleancss = require('gulp-clean-css');
const sourceMaps = require('gulp-sourcemaps');
// const groupMedia = require('gulp-group-css-media-queries');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const server = require('gulp-server-livereload');

// Settings

const cleanSettings = {
    force: true
}

const htmlminSettings = {
    collapseWhitespace: true,
    removeComments: true
}

const sassSettings = {
    indentType: 'tab',
    indentWidth: 1,
    outputStyle: 'expanded'
}

const serverSettings = {
    livereload: true,
    open: true
}

const plumberSettings = (title) => {
    return {
        errorHandler: notify.onError({
            title: title,
            message: 'Error <%= error.message %>',
            sound: false
        })
    }
}

// Tasks

gulp.task('clean', function (done) {
    if (fs.existsSync('./dist/')) {
        return gulp.src('./dist/', { read: false })
            .pipe(clean(cleanSettings));
    };
    done();
});

gulp.task('html', function () {
    return gulp.src('./src/html/*.html')
        .pipe(plumber(plumberSettings('HTML')))
        .pipe(nunjucks.compile())
        .pipe(htmlmin(htmlminSettings))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(plumber(plumberSettings('SCSS')))
        .pipe(sourceMaps.init())
        .pipe(sass(sassSettings))
        // .pipe(groupMedia())
        .pipe(sourceMaps.write())
        .pipe(cleancss({ level: { 1: { specialComments: 0 } } /* , format: 'beautify' */ }))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('images', function () {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('fonts', function () {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('js', function () {
    return gulp.src('./src/js/*.js')
        .pipe(plumber(plumberSettings('JS')))
        .pipe(babel())
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest('./dist/js/'));
});

// gulp.task('js', function () {
//     return gulp.src('./src/js/*.js')
//         .pipe(gulp.dest('./dist/js/'));
// });

gulp.task('libs', function () {
    return gulp.src('./src/libs/**/*')
        .pipe(gulp.dest('./dist/libs/'));
});

gulp.task('files', function () {
    return gulp.src('./src/files/**/*')
        .pipe(gulp.dest('./dist/files/'));
});

gulp.task('php', function () {
    return gulp.src('./src/php/**/*')
        .pipe(gulp.dest('./dist/php/'));
});

gulp.task('root', function () {
    return gulp.src(['./src/root/.*', './src/root/*'])
        .pipe(gulp.dest('./dist/'));
});

gulp.task('server', function () {
    return gulp.src('./dist/')
        .pipe(server(serverSettings));
});

gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./src/html/**/*.html', gulp.parallel('html'));
    gulp.watch('./src/img/**/*', gulp.parallel('images'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts'));
    gulp.watch('./src/js/*.js', gulp.parallel('js'));
    gulp.watch('./src/php/**/*', gulp.parallel('php'));
    gulp.watch('./src/libs/**/*', gulp.parallel('libs'));
    gulp.watch('./src/files/**/*', gulp.parallel('files'));
    gulp.watch(['./src/root/.*', './src/root/*'], gulp.parallel('root'));
});

// Default task

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('html', 'sass', 'images', 'fonts', 'js', 'php', 'libs', 'files', 'root'),
    gulp.parallel('server', 'watch')
));
