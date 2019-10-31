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
//listening on the port
server.listen(4000, () => {
    console.log('===server listening on port 4000===');
});
//ROUTE HANDLER:
//('endpoint', (callback)  => {for server request tells server wht to do}
//req = request, res = response
server.get('/', (req, res) => {
    res.send('server is working');
})

server.post('/api/users', (req,res) => {

})

server.get('/api/users', (req,res) => {
    
})

server.get('/api/users/:id', (req,res) => {
    
})

server.delete('/api/users/:id', (req,res) => {
    
})

server.put('/api/users/:id', (req,res) => {
    
})

console.log("hello world")
