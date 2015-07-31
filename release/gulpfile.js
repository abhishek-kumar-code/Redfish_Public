var gulp = require('gulp')
var gutil = require('gulp-util')
var markdown = require('gulp-markdown')
var wrap = require('gulp-wrap')
var less = require('gulp-less')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var inline = require('gulp-inline')
var coffee = require('gulp-coffee')
var concat = require('gulp-concat')
var template = require('./gulp-lodash-template')
var data = require('gulp-data')
var fm = require('front-matter')
var spawn = require('child_process').spawn
var fs = require('fs')
var _ = require('lodash')

var documentDefaults = {
  DocLang: 'en-US',
  DocConfidentiality: ''
}

var docStatuses = {
  wip: {
    DocStatus: 'Work in Progress',
  },
  draft: {
    DocStatus: 'Draft'
  },
  published: {
    DocStatus: 'Published'
  }
}

gulp.task('default', ['css', 'js'], function() {
  gulp.src(['../*.md'])
    .pipe(data(function(file, cb) {
      var content = fm(String(file.contents))
      var data = content.attributes
      file.contents = new Buffer(content.body)

      var git = spawn('git', ['log', '-1', '--format=%ad', '--', file.path])
      git.stdout.on('data', function(d) {
        var date = new Date(d.toString())
        data.modified = date.toISOString().slice(0, 10)

        // Default to a Work in Progress
        if (!data.status) {
          data.stauts = 'wip';
        }

        var merged = _.merge({}, documentDefaults, docStatuses[data.status], data)

        if (!data.released) {
          data.DocConfidentiality = 'DMTF Confidential'
        }

        // Default to expiration of 30 days from today for works in progress
        if (data.status === 'wip' && !data.expiration) {
          data.expiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10)
        }

        cb(null, merged);
      })
      git.on('close', function(code) {
        cb(code > 0 ? "git failed with exit code " + code : null)
      });
      git.on('error', cb)
    }))
    .pipe(template())
    .pipe(markdown())
    .pipe(wrap({src: 'template.html'}))
    .pipe(inline({base: 'dist'}))
    // .pipe(require('gulp-prettify')({indent_size: 2}))
    .pipe(gulp.dest('dist'))
})

gulp.task('css', function() {
  gulp.src('*.less')
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 versions']})
    ]))
    .pipe(gulp.dest('dist'))
})

gulp.task('js', function() {
  gulp.src(['*.coffee', '!gulpfile.js'])
    .pipe(coffee({bare: true}).on('error', gutil.log))
    // .pipe(add('zepto.js', fs.readFileSync('node_modules/zeptojs/zepto.js', 'utf-8'), true))
    // .pipe(gulp.src(['./node_modules/zeptojs/zepto.js']))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
})
