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

app.get('/api/users/:id', function(req, res) {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);

  if(user) {
      res.status(200).json(user)
  } else {
    res.status(404).json({errorMessage: '404 Specified User ID Not Found'})
  }

})

// DELETE
app.delete('/api/users/:id', (req, res) => {
  const {id} = req.params; //destructuring is prettier.
  const deletes = users.find(user => user.id == id);

  if (deletes) {
      users = users.filter(user => user.id != id);
      res.status(200).json({message: 'user deleted!'})
  }

  else {
      res.status(500).json({message: 'The user could not be removed'});
  }
})

app.put('/api/users/:id', (req, res) => {
  const id = req.params.id; 
  const putting = users.find(f => f.id == id)
  if(req.body.name && req.body.bio) {
    if (putting) {
      try {
        putting.name = req.body.name
        putting.bio = req.body.bio
        res.status(200).json({message: 'PUT successful!'})
      } catch (error) {
        res.status(500).json({errorMessage: "User Info Could not be modified"})
      }
    } else {
      res.status(404).json({errorMessage: "User does not exist"})
    }
  } else {
    res.status(400).json({errorMessage: "Provide name and bio for user"})
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