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
            response_index(request, response);
            break;

        case '/other':
            response_other(request, response);
            break;

        case '/style.css':
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(style_css);
            response.end();
            break;

        default:
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('no page...');
            break;
    }
}

function response_index(request, response){
    var msg = 'これはIndexページだよ。'
    var content = ejs.render(index_page, {
        title : 'Index',
        content : msg,
    });
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(content);
    response.end();
}

function response_other(request, response){
    var msg = 'this is Othe page.'
    if(request.method == 'POST'){
        var body = '';

        request.on('data', (data) => {
            body += data;
        });

        request.on('end', () => {
            var post_data = qs.parse(body);
            msg += 'You are write : ' + post_data.msg;
            var content = ejs.render(other_page, {
                title : 'Other',
                content : msg,
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(content);
            response.end();
        });
    } else {
        var msg = 'ページがないよ！'
        var content = ejs.render(other_page, {
            title : 'Other',
            content : msg,
        });
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(content);
        response.end();
    }
}