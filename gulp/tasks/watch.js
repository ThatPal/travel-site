const gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

gulp.task('watch', () => {
    console.log('Running watch task');
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });
    
    watch('./app/index.html', () => {
        console.log('Reloading HTML...');
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', gulp.series('cssInject', () => {
        console.log('CSS successfully injected!!');
    }));
});

gulp.task('cssInject', gulp.series('styles', () => {
    console.log('Injecting CSS...');
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
}));