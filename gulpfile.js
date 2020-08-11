const { src, dest, series, watch, task } = require('gulp');
var cleanCSS = require('gulp-clean-css');
var postcss = require('gulp-postcss');
var browserSync = require('browser-sync').create();
var sourcemaps = require("gulp-sourcemaps");
const { sync } = require('gulp-sass');
var imagemin = require('gulp-imagemin');
const gulpCleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');




function packagecss(cb) {
    return src([
        'src/css/reset.css',
        'src/css/typography.css',
        'src/css/app.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(
            postcss([
                require("autoprefixer"),
                require("postcss-preset-env")({
                    stage: 1,
                    browsers: ["last 2 versions", "IE 11"]
                })
            ])
        )
        .pipe(concat("app.css"))
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

    watch('src/css/app.css', packagecss).on('change', browserSync.reload);
    watch('src/css/typography.css', packagecss).on('change', browserSync.reload);
    watch('src/index.html', packagehtml).on('change', browserSync.reload);
    watch('src/fonts/*', packagefonts).on('change', browserSync.reload);
    watch('src/img/*', runImages).on('change', browserSync.reload);
    cb();
}

exports.watchAll = watchAll;
exports.packagehtml = packagehtml;
exports.packagecss = packagecss;
exports.packagefonts = packagefonts;


exports.default = series(packagecss, packagehtml, packagefonts, runImages, watchAll);
     

