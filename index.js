const express = require('express');
const app = express();
const path = require('path')
const router = express.Router();
const shortid = require("shortid")

router.get('/', function(req, res) {
  // res.sendFile(path.join(__dirname+'/index.html'));
  res.json({api: "running...!"});
  res.send('welcome');
})

// app.use('/', router);
app.use('/', express.json());
app.listen(process.env.port || 1073)

console.log('running at Port 1073')

let users = [{
  id: 1,
  name: "Jane Doe",
  bio: "Not Tarzan's wife, another Jane."
}]
// POST
app.post('/api/users', (req, res) => {
  const body = req.body;

  if(!body.name || !body.bio) {
    res.status(400).json({
      errorMessage: 'Please provide name and bio for the user'
    })
  } else if (body.name && body.bio) {
    body.id = shortid.generate();
    users.push(body)
     res.status(201).json(body)
  } else {
   res.status(500).json({errorMessage: "ERROR! cannot save user to database!"})
  }
})

// GET
app.get('/api/users', (req, res) => {
  res.json(users)

  if(!users) {
    res.status(500).json({errorMessage: "The users information could not be retrieved"})
  } else {
    res.status(200).json();
  }
})


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