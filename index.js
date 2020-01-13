// implement your API here

//import express from 'express'
const express = require('express');

const Users = require('./data/db');

const server = express();

//middleware: teaches express new things
server.use(express.json()); //needed to parse JSON

//routes/endpoints

//GET to '/'
// server.get('/', function(request,res){
//     res.send({hello: 'web 25!, welcome to the Backend!'});
// })

//GET list of Users
server.get('/api/users', (req, res) => {
Users.find() //reutrn a promise
.then(users => {
    res.status(200).json(users);
})
.catch(er => {
    console.log(er)
    //handle the error
    res.status(500).json({errorMessage: 'sorry, error getting Users List'})
  })
})

//Get user by ID
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.findById(id) // put a number inside - () it works...//reutrn a promise
    .then(users => {
        res.status(200).json(users);
    })
    .catch(er => {
        console.log(er)
        //handle the error
        res.status(500).json({errorMessage: "The user information could not be retrieved."})
      })
    })


//create a USER
server.post('/api/users', (req, res) => {
    const userData = req.body;
    // never trust the client, validate the data.
    Users.insert(userData)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        console.log(error);
        // handle the error
        res.status(400).json({
            errorMessage: "ADD USER - Please provide name and bio for the user."});
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database",
        });
  });
})
  //delete a User

  server.delete('/api/users/:id', (req,res)=> {
      const id = req.params.id;
      Users.remove(id)
      .then(deleted => {
    // res.status(204).end();
    res.status(200).json(deleted);
    res.status(404).json({
            message: "The user with the specified ID does not exist.",
          });

      })
        // 
      .catch(error => {
        console.log(error);
        // handle the error
       
        res.status(500).json({
          errorMessage: 'error removing the user',
        });
      });
  })


  //update a User: extra exercise

// .put

server.put('/api/users/:id', (request, response) => {
    const id = request.params.id;
    const userData = request.body;
    Users.update(id, userData)
    .then(updated => {
        response.status(200).json(updated)
        //response.status(204).json(updated)
        response.status(404).json({message: "The user with the specified ID does not exist."}) 
    })
    .catch(error => {
        console.log(error);
        //handle the error
        response.status (400).json({ errorMessage: " EDIT USER - Please provide name and bio for the user." })
        response.status(500).json({ errorMessage: "The user information could not be modified." })
        
    })
})


//PORT 
const port = 3000;
server.listen(port, () => console.log(`\n ** api on port: ${port} **\n`));