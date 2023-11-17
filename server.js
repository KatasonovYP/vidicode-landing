// Import the 'http' module
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the hostname and port number
const hostname = '127.0.0.1';
const port = 20300;

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Parse the request URL to get the file path
  let filePath = '.' + req.url;

  // If the path is '/', set it to '/index.html'
  filePath = filePath === './' ? './index.html' : filePath;

  // Get the file extension
  const extname = String(path.extname(filePath)).toLowerCase();

  // Define the content type based on the file extension
  const contentType = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'image/svg+xml',
  };

  // Determine the content type for the response header
  const contentTypeHeader = contentType[extname] || 'application/octet-stream';

  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // If the file is not found, return a 404 error
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found');
      } else {
        // For other errors, return a 500 internal server error
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('500 Internal Server Error: ' + err.code);
      }
    } else {
      // If the file is found, set the appropriate content type and send the content
      res.writeHead(200, { 'Content-Type': contentTypeHeader });
      res.end(content, 'utf-8');
    }
  });
});

// Listen on the specified port and hostname
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
