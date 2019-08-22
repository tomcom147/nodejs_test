const http = require('http');

var server = http.createServer(
    (request, response)=>{
        response.setHeader('Content-Type', 'text/html');
        response.write('<!DOCTYPE html><html lang="ja">');
        response.write('<head><meta charaset="utf-8">')
        response.write('<title>Hello</title></head>');
        response.write('<body><h1>Hello Node.js sample page!</h1>');
        response.write('<p>これは、Node.jsのサンプルページです！</p>', 'utf8');
        response.end();
    }
);

server.listen(3030);
console.log('Server is running!')