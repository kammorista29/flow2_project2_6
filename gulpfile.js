const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
// const postcss = require("gulp-postcss");
// const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const sass = require('gulp-sass')(require('sass'));
const del = require("del");

gulp.task('html', () => {
   return gulp.src('source/*.html').pipe(gulp.dest('./build/'));
});

gulp.task('watch', () => {
   browserSync.init({
      server: {
         baseDir: "./build"
      }
   });
   gulp.watch('./source/*.html', gulp.series('html'));
   gulp.watch('./source/*.html').on('change', browserSync.reload);
   gulp.watch('./source/**/*.scss', gulp.series('css'));
   gulp.watch('./source/**/*.scss').on('change', browserSync.reload);
});

gulp.task("css", function () {
   return gulp.src("source/scss/style.scss")
     .pipe(plumber())
     .pipe(sourcemap.init())
     .pipe(sass())
     .pipe(csso())
     .pipe(rename("style.min.css"))
     .pipe(sourcemap.write("."))
     .pipe(gulp.dest("build/css"));
 });

 gulp.task("copy", function () {
   return gulp.src([
     "source/fonts/**/*.{woff,woff2}",
     "source/js/**/*",
     "source/img/*",
     "!source/img/icon-*.svg",
     "source/bg/*",
     "source/*.ico*"
   ], {
     base: "source"
   })
   .pipe(gulp.dest("build"));
 });

 gulp.task("clean", function () {
   return del("build");
 });