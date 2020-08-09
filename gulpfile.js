const { src, dest, series, watch, task } = require('gulp');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var sourcemaps = require("gulp-sourcemaps");
const { sync } = require('gulp-sass');
var imagemin = require('gulp-imagemin');

function packagecss(cb) {
    return src('src/css/app.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(dest("dist"))
        .pipe(browserSync.stream())
    cb();
}

function packagehtml(cb) {
    return src('src/index.html')
        .pipe(dest("dist"))
    cb();
}

function packagefonts(cb) {
    return src('src/fonts/*')
        .pipe(dest("dist/fonts/"))
    cb();
}

function runImages() {
    return src('src/img/*')
        .pipe(imagemin())
        .pipe(dest("dist/img/"))
}

function watchAll(cb) {
    browserSync.init({
        server: {
            baseDir: "dist"
        }

    })

    watch('src/css/app.css', packagecss);
    watch('src/index.html', packagehtml);
    watch('src/fonts/*', packagefonts);
    watch('src/img/*', runImages);
    cb();
}

exports.watchAll = watchAll;
exports.packagehtml = packagehtml;
exports.packagecss = packagecss;
exports.packagefonts = packagefonts;


exports.default = series(packagecss, packagehtml, packagefonts, runImages, watchAll);
     

