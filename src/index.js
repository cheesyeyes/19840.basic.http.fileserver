import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';

const port = 5000;
const directory = './bui/pub';

const server = http.createServer((req, res) => {
// parse URL
const parsed = url.parse(req.url);
// extract URL path
let pathname = `${directory}${parsed.pathname}`;
console.log(pathname);

const mimeType = {
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
fs.exists(pathname, function (exist) {
  if(!exist) {
    // if the file is not found, return 404
    res.statusCode = 404;
    res.end(`File ${directory}${pathname} not found.`);
    return;
  }
      // if is a directory, then look for index.html
      if (fs.statSync(pathname).isDirectory()) {
        pathname += '/index.html';
        console.log(pathname);
      }

      const ext = path.parse(pathname).ext;
      console.log(ext);
      // read file from file system
      fs.readFile(pathname, function(err, data){
        if(err){
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          // if the file is found, set Content-type and send data
          res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
          res.end(data);
        }
      });
    });
});

server.listen(port, (err) => {
  if (err) {
    return console.log('error ', err)
  }
  console.log(`Server is listening on ${port}`)
})
