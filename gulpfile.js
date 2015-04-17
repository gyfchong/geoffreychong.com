var gulp = require("gulp")
	ejs = require("gulp-ejs")
	compass = require("gulp-compass")
	sourcemaps = require("gulp-sourcemaps")
	gutil = require("gulp-util")
	jshint = require("gulp-jshint")
	uglify = require("gulp-uglify")
	rename = require("gulp-rename")
	concat = require("gulp-concat")
	browserSync = require("browser-sync")
	reload = browserSync.reload;
	plumber = require("gulp-plumber")
	notify = require("gulp-notify"),
	imageop = require('gulp-image-optimization');


// Compile SCSS
gulp.task("scss", function() {
	return gulp.src("source/assets/css/**/*.scss")
		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(compass({
			css: "build/assets/css",
			sass: "source/assets/css",
			sourcemap: true
		}))
		.pipe(gulp.dest("build/assets/css"))
		.pipe(notify("SCSS: DONE"));
});

// Compile JS:Head
gulp.task("js:head", function() {
	return gulp.src([ "source/assets/js/head.js", "source/assets/js/head/*.js"])
		.pipe(sourcemaps.init())
		.pipe(concat("head.js"))
		.pipe(rename({suffix: ".min"}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("build/assets/js"))
		.pipe(notify("JS:HEAD: DONE"));
});

// Compile JS:plugins
gulp.task("js:plugins", function() {
	return gulp.src("source/assets/js/plugins/*.js")
		.pipe(sourcemaps.init())
		.pipe(concat("plugins.js"))
		.pipe(rename({suffix: ".min"}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("build/assets/js"))
		.pipe(notify("JS:PLUGINS: DONE"));
});

// Javascript Process
gulp.task("js:script", function() {
	return gulp.src([ "source/assets/js/modules/*.js", "source/assets/js/script.js"])
		.pipe(sourcemaps.init())
		.pipe(concat("script.js"))
		.pipe(rename({suffix: ".min"}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("build/assets/js"))
		.pipe(notify("JS:SCRIPT: DONE"));
});


gulp.task('images', function(cb) {
    gulp.src(['source/assets/img/*.png','source/assets/img/*.jpg','source/assets/img/*.gif','source/assets/img/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('build/assets/img')).on('end', cb).on('error', cb)
    .pipe(notify("IMAGE OPTIMISATION: DONE"));
});

// Start Browsersync server and watch file changes
gulp.task("server", ["scss","js:head", "js:script", "js:plugins", "images"], function() {
	browserSync({
		server: "build"
	});

	gulp.watch("source/assets/css/**/*.scss", ["scss"]);
	gulp.watch("source/assets/js/**/*.js", ["js:head", "js:script", "js:plugins"]);
	gulp.watch("source/assets/img/*", ["images"]);
	// gulp.watch("source/**/*.ejs", ["ejs"]);

	gulp.watch("build/**/*.css").on("change", reload);
	gulp.watch("build/**/*.js").on("change", reload);
	gulp.watch("build/**/*.html").on("change", reload);
	gulp.watch("build/**/img/*").on("change", reload);
});


// Launch server
gulp.task('default', ['server']);