var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;
 

// SaSS process
gulp.task('sass', function () {
	gulp.src('./source/scss/*.scss')
	.pipe(sourcemaps.init())
		.pipe(sass())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.reload({stream:true}));
});

// Javascript Process
gulp.task('js', function() {
  return gulp.src(['./source/js/*.js'])
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./build/js/'));
});

gulp.task('js-watch', ['js'], browserSync.reload);


// Browsersync setup
gulp.task('serve', ['sass', 'js'], function() {
	browserSync({
		server: "build"
	});

	gulp.watch("./source/scss/*.scss", ['sass']);
	gulp.watch("./build/*.html").on('change', reload);
	gulp.watch("./source/js/*.js", ['js-watch']);
});


// Launch server
gulp.task('default', ['serve']);