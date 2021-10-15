const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('html', function () {
    return gulp.src('source/*.html').pipe(gulp.dest('./build'))
});

gulp.task('watch', () => {
    browserSync.init({
        srver: {
            baseDir: "build"
        }
    });

    gulp.watch('source/*html', gulp.series('html'))
    gulp.watch('source/*html').on('change', browserSync.reload);
});