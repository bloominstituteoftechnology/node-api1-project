// implement your API here

//import express from 'express'
const express = require('express');

const Hubs = require('./data/hubs-model.js');

const server = express();

//middleware: teaches express new things
server.use(express.json()); //needed to parse JSON

//routes/endpoints

//GET to '/'
server.get('/', function(request,response){
    response.send({hello: 'web 25!, welcome to the Backend!'});
})

//list of Hubs
server.get('/api/hubs', (req, res) => {
// read data from database(Hubs)
Hubs.find() //reutrn a promise
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
server.post('/api/hubs', (req, res) => {
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

  server.delete('/api/hubs/:id', (req,res)=> {
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


const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} **\n`));