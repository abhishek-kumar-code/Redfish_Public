var _ = require('lodash')
var gutil = require('gulp-util')
var through = require('through2');

module.exports = function(defaults, options) {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-lodash-template', 'Streaming not supported'));
      return;
    }

    try {
      file.contents = new Buffer(_.template(file.contents.toString())(_.merge({}, defaults, file.data), options));
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-lodash-template', err, {fileName: file.path}));
    }

    cb()
  })
}
