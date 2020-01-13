// implement your API here

//import express from 'express'
const express = require('express');

const Users = require('./data/db.js');

const server = express();

//middleware: teaches express new things
server.use(express.json()); //needed to parse JSON

//routes/endpoints

//GET to '/'
server.get('/', function(request,response){
    response.send({hello: 'web 25!, welcome to the Backend!'});
})

//list of Hubs
server.get('/api/users', (req, res) => {
// read data from database(Hubs)
Users.find() //reutrn a promise
.then(hubs => {
    res.status(200).json(hubs);
})
.catch(er => {
    console.log(er)
    //handle the error
    res.status(500).json({errorMessage: 'sorry, error getting Hubs List'})
  })
})

//create a Hub
server.post('/api/users', (req, res) => {
    const hubData = req.body;
    // never trust the client, validate the data. for now we trust the data for the demo
    Hubs.add(hubData)
      .then(hub => {
        res.status(201).json(hub);
      })
      .catch(error => {
        console.log(error);
        // handle the error
        res.status(500).json({
          errorMessage: 'sorry, we ran into an error creating the hub',
        });
      });
  });
  
  //delete a Hub

  server.delete('/api/users/:id', (req,res)=> {
      const id = req.params.id;
      Hubs.remove(id)
      .then(deleted => {
    // res.status(204).end();
    res.status(200).json(deleted);
      })
      .catch(error => {
        console.log(error);
        // handle the error
        res.status(500).json({
          errorMessage: 'error removing the hub',
        });
      });
  })

  //update a Hub : extra exercise

// .put
server.put('/api/users/:id', (request, response) => {
    const id = request.params.id;
    const userData = request.body;
    Users.update(id, userData)
    .then(updated => {
       response.status(204).json(updated)
    })
    .catch(error => {
        console.log(error);
        //handle the error
        response.status(500).json({errorMessage: 'Sorry, we ran into an error updating the users.'})
    })
})


//PORT 
const port = 3000;
server.listen(port, () => console.log(`\n ** api on port: ${port} **\n`));