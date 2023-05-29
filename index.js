const http = require("http");

http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(JSON.stringify({
        "status": "ok",
    }));
}).listen(3000, ()=> console.log('server rodando na 3000'))
