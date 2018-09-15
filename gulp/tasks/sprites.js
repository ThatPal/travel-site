const gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    del = require('del');

const config = {
    mode: {
        css: {
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

gulp.task('beginClean', () => {
    console.log('Cleaning up old sprites...');
    return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', () => {
    console.log('Creating sprite...');
    return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('copySpriteGraphic', () => {
    console.log('Copying sprite graphics file...');
    return gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', () => {
    console.log('Copying sprite CSS file...');
    return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', () => {
    console.log('Cleaning up temp files...');
    return del(['./app/temp/sprite']);
});

gulp.task('icons', gulp.series('beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean'));