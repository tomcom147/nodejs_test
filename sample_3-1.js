const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

var server = http.createServer(getFromClient);

server.listen(3030);
console.log('Server is running!');

function getFromClient(request, response){
    var url_parts = url.parse(request.url, true);
    switch(url_parts.pathname){
        case '/':
            var content = 'これはIndexページです。'
            var query = url_parts.query;
            if(query.msg != undefined){
                content += "あなたは、「" + query.msg + "」と送りました。";
            }
            var content = ejs.render(index_page, {
                title:"Index",
                content:content,
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(content);
            response.end();
            break;
        
        case '/style.css':
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(style_css);
            response.end();
            break;

        default:
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write('no page...');
            break;
    }
}
