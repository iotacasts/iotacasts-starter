var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "./dist"
  });

  gulp.watch("app/scss/**/*.scss", ['sass']);
  gulp.watch("app/svg/**/*.svg", ['sass']);
  gulp.watch("app/index.html", ['index']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src("app/scss/*.scss")
    .pipe(sass().on('error', function(err) {
    console.error(err.message);
    browserSync.notify(err.message, 3000);
    this.emit('end');
  }))
  .pipe(gulp.dest("dist/css"))
  .pipe(browserSync.stream());
});

gulp.task('svg', function() {
  return gulp.src("app/svg/**/*.svg")
    .pipe(gulp.dest("dist/svg"))
    .pipe(browserSync.stream());
})

gulp.task('index', function() {
  return gulp.src("app/index.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
})

gulp.task('default', ['serve', 'index', 'sass', 'svg']);
