const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');

gulp.task('styles', () => {
  return gulp
    .src('styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./styles/'));
});

gulp.task('clean', () => {
  return del(['styles/main.css']);
});

gulp.task('watch', () => {
  gulp.watch('styles/*.scss', (done) => {
    gulp.series(['clean', 'styles'])(done);
  });
});

gulp.task('default', gulp.series(['clean', 'styles']));
