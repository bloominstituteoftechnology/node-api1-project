// implement your API here

const db = require('./data/db.js');
const express = require('express');

const server = express();

server.listen(4000, ()=> {
   console.log('===server listening on port 4000====');
});


server.get('/', (request, response)=>{
 response.send('Hello world')
})

server.get('/find', (req, res) => {
  db.find()
      .then(find => {
          res.status(200).json(find);
      })
      .catch(err => {
          res.status(500).json({ sucess: false, err });
      });
});

