const http = require('http');
const fs = require('fs');

var server = http.createServer(getFormClient);

server.listen(3030);
console.log('Server is running!')

function getFormClient(req,res){
    fs.readFile('./html/index.html', 'UTF-8',
        (error, data)=>{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    );
}
