const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');

gulp.task('styles', () => {
  return gulp
    .src('styles/main.scss')
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

gulp.task('minifyCSS', () => {
  return gulp
    .src('styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('./styles/'));
});

gulp.task('minifyHTML', () => {
  return gulp
    .src(['./index.html'])
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(gulp.dest('./'));
});

gulp.task('build', gulp.series(['minifyCSS', 'minifyHTML']));

gulp.task('default', gulp.series(['clean', 'styles']));
