const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');
const PORT = 3500;

const users = require('./users');
const mineTypes = require('./public/js/mineTypes');
require('dotenv').config();

const myVariable = process.env.MY_VARIABLE;
console.log('MY_VARIABLE:', myVariable);

function staticFile(res, filePath, ext) {
  res.setHeader('Content-Type', mineTypes[ext]);
  fs.readFile(
    path.join(__dirname, 'public', filePath),
    // { encoding: 'utf8', flag: 'r' },
    (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('<h1>404 Not Found!!</h1>');
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
        staticFile(res, '/html/main.html', '.html');
        break;
      case '/contact':
        console.log('contact page');
        staticFile(res, '/html/contact.html', '.html');
        break;
      case '/about':
        console.log('about page');
        staticFile(res, '/html/about.html', '.html');
        break;
      case '/login':
        console.log('login');
        staticFile(res, '/html/login.html', '.html');
        break;
      case '/admin':
        console.log('not_admin');
        staticFile(res, '/html/not_admin.html', '.html');
        break;
      case '/cabinet':
        console.log('cabinet');
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          console.log('Body:', body);
          const parsedBody = querystring.parse(body);
          const { login, password } = parsedBody;

          const user = Object.values(users).find(
            (user) => user.name === login && user.pass === password
          );

          if (user) {
            res.end('User authenticated');
          } else {
            res.end('Invalid username or password');
          }
        });
        break;
      default:
        const extname = String(path.extname(url)).toLocaleLowerCase();
        // console.log('🚀 ~ .createServer ~ extName:', extname);

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
