var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps');
 
gulp.task('sass', function () {
	gulp.src('./source/scss/*.scss')
	.pipe(sourcemaps.init())
		.pipe(sass())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./static/css'));
});

gulp.task('watch', function() {
	gulp.watch('./source/scss/*.scss', ['sass']);
});

gulp.task('default', function() {
  // place code for your default task here
});