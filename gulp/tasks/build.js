const gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    buildFolder = 'docs';

gulp.task('previewDist', () => {
    console.log('===] Previewing new build... [===');
    browserSync.init({
        notify: false,
        server: {
            baseDir: buildFolder
        }
    });
});

gulp.task('deleteDistFolder', () => {
    console.log('===] Cleaning up old build... [===');
    return del([`./${buildFolder}`]);
});

gulp.task('copyGeneralFiles', () => {
    console.log('===] Copying over additional files... [===');
    const pathsToCopy = [
        './app/**/*', 
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];

    return gulp.src(pathsToCopy)
    .pipe(gulp.dest(`./${buildFolder}`));
});

gulp.task('optimizeImages', gulp.series('icons', () => {
    console.log('===] Optimizing images... [===');
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
    }))
    .pipe(gulp.dest(`./${buildFolder}/assets/images`));
}));

gulp.task('usemin', gulp.series('styles', 'scripts', () => {
    console.log('===] Compiling and copying HTML, CSS and JS files... [===');
    return gulp.src('./app/index.html')
    .pipe(usemin({
        css: [() => {return rev()}, () => {return cssnano()}],
        js: [() => {return rev()}, () => {return uglify()}]
    }))
    .pipe(gulp.dest(`./${buildFolder}`));
}));

gulp.task('build', gulp.series('deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin', 'previewDist'));