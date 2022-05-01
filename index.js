const http = require('http');

const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer(function (req, res) {
    console.log('Request for ' + req.url + ' by method ' + req.method);
  
    if (req.method == 'GET') {
      var fileUrl;

      //if no url is provided default to the index
      if (req.url == '/') fileUrl = '/index.html';
      else fileUrl = req.url;
  
      //path.resolve() returns an absolute path to the file
      var filePath = path.resolve('./public'+fileUrl);

      //path.extname return the extension of the file
      const fileExt = path.extname(filePath);
      if (fileExt == '.html') {
        fs.exists(filePath, function (exists) {
          if (!exists) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl + 
                        ' not found</h1></body></html>');
            return;
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          fs.createReadStream(filePath).pipe(res);
        });
      }
      else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + fileUrl + 
                ' not a HTML file</h1></body></html>');
      }
    }
    else {
        //else when it is not a GET method;
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + 
                ' not supported</h1></body></html>');
    }
  })
  

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

