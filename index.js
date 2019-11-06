// implement your API here

const db = require('./data/db.js');
const express = require('express');

const server = express();

server.listen(4000, ()=> {
   console.log('===server listening on port 4000====');
});

server.use(express.json());

server.get('/', (request, response)=>{
 response.send('Hello world')
})

server.get('/api/users', (req, res) => {
  db.find()
      .then(find => {
          res.status(200).json(find);
      })
      .catch(err => {
          res.status(500).json({ sucess: false, err });
      });
});

 server.post('/api/users', (req, res) =>{
    
     const newUser = req.body;

     const {name, bio} = newUser;

      console.log(newUser);
      if (!name || !bio) {
        res
          .status(400)
          .json({ errorMessage: 'Please provide name and bio for the user.' });
      } else {
     db.insert(newUser)
        .then( user =>{
            res.status(201).json({success:true, user})
        })
        .catch(err => {
            res.status(500).json({ sucess: false, err });
        });
    }
 });


server.get('/api/users/:id', (req, res) => {
    console.log(req);
    db.findById(req.params.id)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res
            .status(404)
            .json({ message: 'ID does not exist.' });
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ errorMessage: 'user could not be retrieved.' });
      });
  });
