'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require("gulp-rename");

gulp.task('babelize', () =>
	gulp.src('./src/SimpleSocialShare.js')
		.pipe(babel({presets: ['env']}))
		.pipe(gulp.dest('./dist'))
);

gulp.task('uglify', () =>
	gulp.src('./dist/SimpleSocialShare.js')
		.pipe(uglify())
		.pipe(rename('SimpleSocialShare.min.js'))
		.pipe(gulp.dest('./dist'))
);

gulp.task('buildJS', ['babelize', 'uglify']);