const express = require('express');
const app = express();
const path = require('path')
const router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.use('/', router);
app.listen(process.env.port || 1073)

console.log('running at Port 1073')
// const http = require('http');
// const fs = require('fs');

// const hostname = '127.0.0.1';
// const port = 1073;

// const server = http.createServer((req,res) => {
//  res.writeHead(200, {
//    'Content-Type': 'text/html'
//  })
//  fs.readFile('./index.html', null, function (error, data) {
//    if (error) {
//      res.writeHead(404);
//      res.write('NOT FOUND');

//    } else {
//      res.write(data)
//    }
//  })
//   res.end();
// });

// server.listen(port, hostname, () => {
//   console.log(`\n== api on port ${port} ==\n`)
// });