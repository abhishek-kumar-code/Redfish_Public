var http = require('http')
  , path = require('path')
  , parse = require('url').parse
  , fs = require('fs')

process.on('SIGINT', function() {
  console.log('Shutting down...');
  process.exit();
});

var notFound = function(req, res) {
  var msg = 'No such resource';
  log(req, 404, msg);
  head(res, 404, msg, {'Content-Type': 'text/plain'});
  res.end(msg)
}

var redirect = function(req, res, path) {
  log(req, 302, path);
  head(res, 302, null, {'Location': path});
  res.end();
}

var log = function(req, status, msg) {
  console.log(req.method, '-', status, '-', req.url, msg || '');
}

var head = function(res, status, body, overrides) {
  var headers = {
    'Cache-Control': 'no-store',
  }

  for (var key in overrides) {
    if (overrides.hasOwnProperty(key)) {
      headers[key] = overrides[key];
    }
  }

  if (body) {
    headers['Content-Length'] = body.length ? body.length : body;
  }

  res.writeHead(status, headers);
}

var staticFile = function(req, res, pathname) {
  // Disable retrieving arbitrary files from the file system
  if (/\.\./.test(pathname)) {
    return notFound(req, res);
  }

  var file = path.join(__dirname, pathname);
  return fs.stat(file, function(err, stat) {
    if (err || !stat.isFile()) { return notFound(req, res); }

    var type = null
      , ext = pathname.match(/\.([^\.]+)$/);
    switch (ext ? ext[1] : '') {
      case 'html':
        type = 'text/html';
        break;
      case 'css':
        type = 'text/css';
      break;
      case 'js':
        type = 'text/javascript';
      break;
      default:
        type = 'text/plain';
    }

    log(req, 200);
    head(res, 200, stat.size, {
      'Content-Type': type + '; charset=utf-8'
    });
    fs.createReadStream(file, {encoding: 'utf8'}).pipe(res);
  })
}

var mockupFile = function(req, res, pathname) {
  var file = pathname.match(/\/rest\/v1\/(.*)$/)[1];
  fs.readFile(path.join(__dirname, file, 'index.html'), 'utf8', function(err, data) {
    if (err) {
      return notFound(req, res);
    } else {
      try {
        // Remove byte order marker if present
        data = JSON.parse(data.replace(/^\uFEFF/, ''));
      } catch(e) {
        log(req, 500);
        head(res, 500, e.message, {
          'Content-Type': 'text/plain; charset=utf-8'
        })
        return res.end(e.message)
      }

      log(req, 200);
      data = JSON.stringify(data, null, '  ');
      head(res, 200, data, {
        'Content-Type': 'application/json',
      })
      res.end(data, 'utf8');
    }
  })
}

var server = http.createServer(function (req, res) {
  var url = parse(req.url);
  if (url.pathname === '/rest/v1') {
    return redirect(req, res, '/rest/v1/');
  }

  if (!/\/rest\/v1\//.test(url.pathname)) {
    return staticFile(req, res, url.pathname);
  }

  if (/text\/html/.test(req.headers['accept'])) {
    return staticFile(req, res, 'viewer.html');
  } else {
    return mockupFile(req, res, url.pathname);
  }
})

server.listen(9080, 'localhost', function() {
  console.log('Mockup listening on http://localhost:9080')
});
