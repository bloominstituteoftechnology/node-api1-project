const http = require('http'); // built in node.js module

const hostname = '127.0.0.1'; // local computer server
const port = 3000; // port use to watch for traffic

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Okay');
})

server.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}:${port}/`);
})