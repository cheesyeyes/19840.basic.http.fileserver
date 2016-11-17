'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 5000;
var directory = './bui/pub';

var server = _http2.default.createServer(function (req, res) {
  // parse URL
  var parsed = _url2.default.parse(req.url);
  // extract URL path
  var pathname = '' + directory + parsed.pathname;
  console.log(pathname);

  var mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
  };
  _fs2.default.exists(pathname, function (exist) {
    if (!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end('File ' + directory + pathname + ' not found.');
      return;
    }
    // if is a directory, then look for index.html
    if (_fs2.default.statSync(pathname).isDirectory()) {
      pathname += '/index.html';
      console.log(pathname);
    }

    var ext = _path2.default.parse(pathname).ext;
    console.log(ext);
    // read file from file system
    _fs2.default.readFile(pathname, function (err, data) {
      if (err) {
        res.statusCode = 500;
        res.end('Error getting the file: ' + err + '.');
      } else {
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', mimeType[ext] || 'text/plain');
        res.end(data);
      }
    });
  });
});

server.listen(port, function (err) {
  if (err) {
    return console.log('error ', err);
  }
  console.log('Meta server is listening on ' + port);
});