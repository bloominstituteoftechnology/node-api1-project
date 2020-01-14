const express = require('express');

const server = express();

const data = require('./data/db.js');

server.use(express.json());

server.get("/", function(request, response) {
  response.send({ hello: `I am running on ${port}` });
});

//GET /api/users Return array of all the user objects.
server.get('/api/users', function(request, response) {
  data.find()
    .then(users => {
      response.status(200).json(users);
      console.log(users);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({
        errorMessage: 'sorry, we ran into an error getting the data'
      });
    });
});

//GET /api/users:id Returns the user object with the specified id.
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
    data.findById(id)
      .then(users => {
        if(users){  
          res.status(200).json(users);
        } else {
          res.status(404).json({ error: 'The user with that ID does not exist' })
        }
      })
      .catch(error => {
        console.log('error on get user by id', error)
          res.status(500).json({ error: 'The user information could not be retrieved' })
      })
});

//POST
server.post('/api/users', (req, res) => {
  const newUser = req.body;
  if (data.name && data.bio) {
    data.insert(newUser)
      .then(users => {
        res.statusMessage(201).json({...users, ...newUser })
      })
      .catch(error => {
        console.log('error on post for users', error)
        res.status(500).json({ error: 'There was an error while savint he user to the database' })
      })
  } else {
    res.status(400).json({ errorMessage: 'Please provide name and bio for the user' })
  }
})

//DELETE
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  data.remove(id)
    .then(removed => {
      if (removed) {
        res.status(200).json({ message: 'user removed successfully', removed });
      } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist' })
      }
    })
    .catch(error => {
      console.log('error on DELETE /spi/users/:id', error);
      res.status(500).json({ errorMessage: 'The user could not be removed' })
    })
})

//PUT
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const { name, bio } = req.body;

  if (!name || !bio) {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user" })
  } else {
      data.update(id, req.body)
          .then(user => {
              if (user) {
                  res.status(200).json({ message: 'The user was updated', user })
              } else {
                  res.status(404).json({ message: 'The user with the specified ID does not exist' })
              }
          })
          .catch(error => {
              console.log('error on PUT /api/users/:id', error);
              res.status(500).json({ error: 'The user information could not be modified' })
          })
  }
})

const port = 8001;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));