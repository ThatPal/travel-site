const gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

gulp.task('watch', () => {
    console.log('===] Running watch task [===');
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });
    
    watch('./app/index.html', () => {
        console.log('===] Reloading HTML... [===');
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', gulp.series('styles', 'cssInject', () => {
        console.log('===] CSS successfully injected!! [===');
    }));

    watch('./app/assets/scripts/**/*.js', gulp.series('modernizr', 'scripts', 'scriptsRefresh'));

});

gulp.task('cssInject', () => {
    console.log('===] Injecting CSS... [===');
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', () => {
    console.log('===] Reloading scripts... [===');
    browserSync.reload();
});