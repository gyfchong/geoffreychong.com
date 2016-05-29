var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	imageop = require('gulp-image-optimization'),
	cssGlobbing = require('gulp-css-globbing'),
	jsxTransform = require('gulp-react'),
	changed = require('gulp-changed'),
	autoprefixer = require('gulp-autoprefixer');

// Compile SCSS
// Glob all the required SCSS files into 1 styles.css
gulp.task('scss', function() {
	return gulp.src('source/assets/css/styles.scss')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(cssGlobbing({
			extensions: ['.scss'],
			scssImportPath: {
				leading_underscore: false,
				filename_extension: false
			}
		}))
		.pipe(sourcemaps.init())
			.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
				.pipe(gulp.dest('build/assets/css'))
				.pipe(notify('SCSS: DONE'));
});

// Compile JS:Head
gulp.task('js:head', function() {
	return gulp.src(['source/assets/js/head.js', 'source/assets/js/head/*.js'])
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(changed('build/assets/js'))
		.pipe(sourcemaps.init())
		.pipe(concat('head.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/assets/js'))
		.pipe(notify('JS:HEAD: DONE'));
});

// Compile JS:vendor
gulp.task('js:vendor', function() {
	return gulp.src('source/assets/js/vendor/*.js')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(changed('build/assets/js'))
		.pipe(gulp.dest('build/assets/js/vendor/'))
		.pipe(notify('JS:VENDOR: DONE'));
});

// Compile JS:plugins
gulp.task('js:plugins', function() {
	return gulp.src('source/assets/js/plugins/*.js')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(changed('build/assets/js'))
		.pipe(sourcemaps.init())
		.pipe(concat('plugins.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/assets/js'))
		.pipe(notify('JS:PLUGINS: DONE'));
});

// Javascript Process
gulp.task('js:script', function() {
	return gulp.src(['source/assets/js/**/*.js', 'source/assets/js/script.js', '!source/assets/js/head/*.js', '!source/assets/js/vendor/*.js', '!source/assets/js/plugins/*.js'])
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(changed('build/assets/js'))
		.pipe(sourcemaps.init())
		.pipe(concat('script.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/assets/js'))
		.pipe(notify('JS:SCRIPT: DONE'));
});

// Optimise images
gulp.task('images', function(cb) {
	gulp.src('source/assets/img/*')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(changed('build/assets/img'))
		.pipe(imageop({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('build/assets/img'))
		.on('end', cb)
		.on('error', cb)
		.pipe(notify('IMAGE OPTIMISATION: DONE'));
});

gulp.task('jsx', function() {
	return gulp.src('source/**/*.jsx')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(jsxTransform())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/assets/js'))
		.pipe(notify('JSX TRANSFORM: DONE'));
});

gulp.task('html:copy', function() {
	gulp.src('source/*.html')
		.pipe(changed('build/'))
		.pipe(gulp.dest('build/'))
		.pipe(notify('HTML COPY: DONE'));
});

// Start Browsersync server and watch file changes
gulp.task('server', ['html:copy', 'jsx', 'scss', 'js:head', 'js:vendor', 'js:script', 'js:plugins', 'images'], function() {
	browserSync({
		server: 'build'
	});

	gulp.watch('source/*.html', ['html:copy']);

	gulp.watch('source/assets/**/*.scss', ['scss']);

	gulp.watch('source/assets/js/head.js', ['js:head']);
	gulp.watch('source/assets/js/*.js', ['js:vendor']);
	gulp.watch('source/assets/js/plugins.js', ['js:plugins']);
	gulp.watch(['source/assets/js/**/*.js', 'source/assets/js/script.js'], ['js:script']);

	gulp.watch('source/assets/img/*', ['images']);

	gulp.watch('source/**/*.jsx', ['jsx']);

	gulp.watch('build/assets/css/*.css').on('change', reload);
	gulp.watch('build/assets/js/*.js').on('change', reload);
	gulp.watch('build/*.html').on('change', reload);
	gulp.watch('build/assets/img/*').on('change', reload);
});

// Launch server
gulp.task('default', ['server']);
