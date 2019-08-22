const http = require('http');
const fs = require('fs');

var server = http.createServer(
    (request, response)=>{
        fs.readFile('./html/index.html', 'UTF-8',
        (error, data)=>{
            var content = data.
                replace(/dummy_title/g, 'タイトルです。').
                replace(/dummy_content/g,'コンテンツだす。')

            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(content);
            response.end();
        });
    }
);　

server.listen(3030);
console.log('Server is running!')