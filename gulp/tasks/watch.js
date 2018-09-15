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

    watch('./app/assets/scripts/**/*.js', gulp.series('scripts', 'scriptsRefresh', () => {
        console.log('Javascript successfully compiled!!');
    }));

});

gulp.task('cssInject', gulp.series('styles', () => {
    console.log('Injecting CSS...');
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
}));

gulp.task('scriptsRefresh', () => {
    console.log('Reloading scripts...');
    browserSync.reload();
});