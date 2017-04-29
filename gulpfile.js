const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
// const imageop = require('gulp-image-optimization');
const cssGlobbing = require('gulp-css-globbing');
const jsxTransform = require('gulp-react');
const changed = require('gulp-changed');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const critical = require('critical');
const replace = require('gulp-replace');
const fs = require('fs');

// Compile SCSS
// Glob all the required SCSS files into 1 styles.css
gulp.task('scss', function() {
	return gulp.src('source/assets/css/styles.scss').pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')})).pipe(cssGlobbing({
		extensions: ['.scss'],
		scssImportPath: {
			leading_underscore: false,
			filename_extension: false
		}
	})).pipe(sass()).pipe(cleanCSS()).pipe(autoprefixer({cascade: false})).pipe(gulp.dest('build/assets/css')).pipe(notify('SCSS: DONE'));
});

// Compile JS:Head
gulp.task('js:head', function() {
	return gulp.src(['source/assets/js/head.js', 'source/assets/js/head/*.js']).pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')})).pipe(changed('build/assets/js')).pipe(concat('head.js')).pipe(rename({suffix: '.min'})).pipe(uglify()).pipe(gulp.dest('build/assets/js')).pipe(notify('JS:HEAD: DONE'));
});

// Compile JS:vendor
gulp.task('js:vendor', function() {
	return gulp.src('source/assets/js/vendor/*.js').pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')})).pipe(changed('build/assets/js')).pipe(gulp.dest('build/assets/js/vendor/')).pipe(notify('JS:VENDOR: DONE'));
});

// Compile JS:plugins
gulp.task('js:plugins', function() {
	return gulp.src('source/assets/js/plugins/*.js').pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')})).pipe(changed('build/assets/js')).pipe(concat('plugins.js')).pipe(rename({suffix: '.min'})).pipe(uglify()).pipe(gulp.dest('build/assets/js')).pipe(notify('JS:PLUGINS: DONE'));
});

// Javascript Process
gulp.task('js:script', function() {
	return gulp.src(['source/assets/js/**/*.js', 'source/assets/js/script.js', '!source/assets/js/head/*.js', '!source/assets/js/vendor/*.js', '!source/assets/js/plugins/*.js']).pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')})).pipe(changed('build/assets/js')).pipe(concat('script.js')).pipe(rename({suffix: '.min'})).pipe(uglify()).pipe(gulp.dest('build/assets/js')).pipe(notify('JS:SCRIPT: DONE'));
});

gulp.task('jsx', function() {
	return gulp.src('source/**/*.jsx').pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')})).pipe(sourcemaps.init()).pipe(concat('app.js')).pipe(rename({suffix: '.min'})).pipe(jsxTransform()).pipe(sourcemaps.write()).pipe(gulp.dest('build/assets/js')).pipe(notify('JSX TRANSFORM: DONE'));
});

gulp.task('html:copy', function() {
	gulp.src('source/*.html').pipe(changed('build/')).pipe(gulp.dest('build/')).pipe(notify('HTML COPY: DONE'));
});

gulp.task('txt:copy', function() {
	gulp.src('source/*.txt').pipe(changed('build/')).pipe(gulp.dest('build/')).pipe(notify('TEXT COPY: DONE'));
});

gulp.task('inline-css', function() {
	gulp.src('build/index.html').pipe(replace(/<link rel="stylesheet" href="assets\/css\/styles.css"[^>]*>/, function(s) {
		var style = fs.readFileSync('build/assets/css/styles.css', 'utf8');
		return '<style>\n' + style + '\n</style>';
	})).pipe(gulp.dest('build/'));
})

// Start Browsersync server and watch file changes
gulp.task('server', [
	'html:copy', 'scss', 'inline-css'
], function() {
	browserSync({server: 'build'});

	gulp.watch('source/*.html', ['html:copy']);

	gulp.watch('source/assets/**/*.scss', ['scss']);

	// gulp.watch('source/assets/js/head.js', ['js:head']);
	// gulp.watch('source/assets/js/*.js', ['js:vendor']);
	// gulp.watch('source/assets/js/plugins.js', ['js:plugins']);
	// gulp.watch(['source/assets/js/**/*.js', 'source/assets/js/script.js'], ['js:script']);

	// gulp.watch('source/assets/img/*', ['images']);

	// gulp.watch('source/**/*.jsx', ['jsx']);

	gulp.watch('build/assets/css/*.css').on('change', reload);
	// gulp.watch('build/assets/js/*.js').on('change', reload);
	gulp.watch('build/*.html').on('change', reload);
	// gulp.watch('build/assets/img/*').on('change', reload);
});

// Launch server
gulp.task('default', ['server']);

gulp.task('build', ['html:copy', 'txt:copy', 'scss', 'inline-css']);
