const gulp = require('gulp'),
    webpack = require('webpack');

gulp.task('scripts', callback => {
    console.log('===] Compiling JS with Webpack... [===');
    webpack(require('../../webpack.config.js'), (err, stats) => {
        if(err) {
            console.log('===] Webpack error [===');
            console.log(err.toString());
            console.log('===] ------------- [===');
        }
        console.log('===] Webpack stats [===');
        console.log(stats.toString());
        console.log('===] ------------- [===');
        callback();
    });
});