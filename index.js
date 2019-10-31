// implement your API here
//const http = requires('http');
//commented out require of standard http information

const express = require('express');

// const hostname= '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", 'text-plain');
//     res.end('Hello')

// })
// html version with plain txt is commented out. working code is using express

const server = express();

// server.listen(port, hostname, () => {
//     console.log(`server listening on port http://${hostname}:${port}`)
// }

//using hostname and port set with standard http request, takes a port and a callback function below:

server.listen(5000, () => {
    console.log('===server listening on port 5000===');
});



console.log("hello world")
