var fs = require('fs');
var path = require('path');
var https = require('https');

var output = path.join(__dirname, 'html')
var css = fs.readFileSync(path.join(__dirname, 'github.css'))
var toc = fs.readFileSync(path.join(__dirname, 'toc.js'))

// Save htmlized markdown document to disk
var save = function(body, filename) {
  fs.writeFile(path.join(output, filename),
"<!DOCTYPE html> \
<html> \
  <head> \
    <style>" + css + " </style> \
    <script type=\"text/javascript\">" + toc + "</script> \
  </head> \
  <body class=\"normal\"> \
    <div id=\"wrapper\">" + body + "</div> \
  </body> \
</html>", function(err) {
    if (err) throw err;
    console.log('Saved ' + filename);
  });
}

// Pass markdown file to github api for processing
var process = function(filename) {
  fs.readFile(filename, function(err, code) {
    if (err) return;

    filename = path.basename(filename).match(/(.+)\.[^\.]+/)[1] + '.html'

    var req = https.request({
      hostname: 'api.github.com',
      port: 443,
      path: '/markdown/raw',
      method: 'POST',
      headers: {
        "Content-Type": 'text/plain',
        "User-Agent": 'RedfishOrg'
      }
    }, function(res) {
      var body = ""
      res.setEncoding('utf8'),
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function(err) {
        if (err) throw err;

        // Github returns non 200 when something has gone wrong, most likely
        // rate limiting has occured
        if (res.statusCode != 200)
          console.log('Rate limit for conversion has been reached, wait until ' + new Date(parseInt(res.headers['x-ratelimit-reset'], 10) * 1000) + " to try again");
        else
          save(body, filename)
      });
    })

    req.write(code.toString());
    req.end();
  });
}

// File all markdown files in current directory
fs.readdir(path.join(__dirname, '..'), function(err, files) {
  if (err) return;

  // Create output directory, don't care if it exists already
  try {
    fs.mkdirSync(output, 0755)
  } catch (err) {
    switch (err.code) {
      case 'EEXIST': break;
      default: throw err;
    }
  }

  for (var i = 0; i < files.length; i++) {
    file = files[i];
    if (/\.md$/.test(file)) {
      process(path.join(__dirname, '..', file));
    }
  }
});

