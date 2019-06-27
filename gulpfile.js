//Variables
var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var prettier = require('gulp-prettier')
var replace = require('gulp-replace')
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

//File Paths
var sassFiles = 'scss/**/*.scss',
	mainSassFile = 'scss/style.scss',
	cssFiles = '.',
	sourceMaps = '/scss/maps'

//Compile main sass into css
function sassy() {
	return gulp
		.src(mainSassFile)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError)) //Using gulp-sass
		.pipe(sourcemaps.write(sourceMaps))
		.pipe(gulp.dest(cssFiles))
}

//Watch for changes in sass files and running sass compile
function watch() {
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });

	gulp.watch(sassFiles, sassy)
	gulp.watch([
		"./*.html",
		"./scss/**/*.scss"
	]).on("change", reload)
}

exports.sassy = sassy
exports.watch = watch
