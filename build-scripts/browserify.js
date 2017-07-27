var fs = require('fs');
var path = require('path')
var browserify = require('browserify');
var bulkify = require('bulkify');

browserify(path.join(__dirname, 'glob.js'))
  .transform(bulkify)
  .transform('babelify', {
    global : true,
    presets: ['es2015', 'babel-polyfill']
  })
  .bundle()
  .pipe(fs.createWriteStream(process.argv[2]));