// implement your API here

const express = require('express');
const server = express();

server.use(express.json()); // this is needed to parse JSON 

const Users = require('./data/db.js');
server.get('/', function(request, response) {
    response.send({data: 'some data'})
})
// see a list of users
server.get('/api/users', (request, response) => {
    // read the data from the database (hubs)
    Users.find() // return a promise
    .then(Users => {
        console.log('Users', Users);
        response.status(200).json(Users);
    })
    .catch(error => {
        console.log(error);
        //handle the error
        response.status(500).json({ errorMessage: "The users information could not be retrieved."})
    })
})


//create a new user
server.post('/api/users', function(req, res) {
    const userData = req.body;
    Users.insert(userData)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        console.log(error);
        //handle the error
        res.status(500).json({
            errorMessage: "Please provide name and bio for the user." 
        });
    });
});

//GET by id	/api/users/:id	Returns object by specific id.
server.get("/api/users/:id", function(request, response) {
    const id = request.params.id;
    Users.findById(id)
      .then(users => {
          console.log(users);
        response.status(200).json(users);
        
      })
      .catch( error => {
        console.log(error);
        response.status(404).json(
          {
            message: "The user with the specified ID does not exist."
          }
        )
      })
  });



//DELETE user by id,  /api/users/:id    removes user by id and return deleted item/user
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.remove(id)
    .then(result => {
        
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: "The user could not be removed" })
    })
})




//PUT /api/users/:id  To update the user's data  by specific id. Modified user is returned

server.put('/api/users/:id', function(req, res) {
    const id = req.params.id;
    Users.update(id, req.body)
      .then(update => {
        res.status(200).json(update);
      })
      .catch( error => {
        console.log(error);
        response.status(500).json(
          {
            errorMessage: "The user information could not be modified."
          });
      });
  });



//listening server 
const port = 8181;
server.listen(port, () => console.log('API ONLINE'));