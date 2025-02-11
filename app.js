const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3500;

const mineTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.ico': 'image/x-icon',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'audio/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
};

function staticFile(res, filePath, ext) {
  res.setHeader('Content-Type', mineTypes[ext]);
  fs.readFile(
    path.join(__dirname, 'public', filePath),
    // { encoding: 'utf8', flag: 'r' },
    (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('<h1>404 Not Found</h1>');
      }
      res.end(data);
    }
  );
}

http
  .createServer((req, res) => {
    const url = req.url;
    console.log('🚀 ~ http.createServer ~ url:', url);

    switch (url) {
      case '/':
        console.log('main page');
        res.write('<h1>Main Page</h1>');
        res.end();
        break;
      case '/contact':
        console.log('contact page');
        staticFile(res, '/contact.html', '.html');
        break;
      default:
        const extname = String(path.extname(url)).toLocaleLowerCase();
        console.log('🚀 ~ .createServer ~ extName:', extname);

        if (extname in mineTypes) {
          console.log(123);
          staticFile(res, url, extname);
        } else {
          res.statusCode = 404;
          res.end('<h1>404 Not Found</h1>');
        }
    }
  })
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
