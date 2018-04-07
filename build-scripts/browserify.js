var fs = require('fs');
var path = require('path')
var browserify = require('browserify');
var bulkify = require('bulkify');

browserify(path.join(__dirname, 'glob.js'), {debug: true})
  .transform(bulkify)
  .transform('babelify', {
    global : true,
    ignore: /.*\/node_modules\/(firebase|auth0-lock).*/,
    presets: ['env', 'babel-polyfill']
  })
  .bundle()
  .pipe(fs.createWriteStream(process.argv[2]));