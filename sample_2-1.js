const http = require('http')

var server = http.createServer(
    (request, response)=> {
        response.end('Hello Node.jp!')
    }
);
server.listen(3030);