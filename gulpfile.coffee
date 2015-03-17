gulp = require 'gulp'
jsonlint = require 'gulp-jsonlint'

gulp.task 'default', ->
  gulp.src [
    'generate-json-schema/**/*.json',
    'mockups/development/**/*.html',
    '!mockups/development/viewer.html'
  ]
    .pipe jsonlint()
    .pipe jsonlint.reporter()
