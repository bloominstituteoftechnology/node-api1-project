//Import
const express = require('express');
//create the server
const server = express();
//middle ware - to teach express new tricks
server.use(express.json()); // how to parse json from the body

let users = [
  {
    id: 1,
    name: 'Jeff Valdez',
    bio: 'Soon I will be the best developer',
  },
];

//functions to the requests
//GET
server.get('/api/users', (req, res) => {
  if (!users) {
    res
      .status(500)
      .json({ errorMessage: 'The users information could not be retrieved.' });
  } else {
    res.status(200).json(users);
  }
});

server.get('/api/users/:id', (req, res) => {
  //This finds the id that is currently in the url for the particular request
  const user = users.find(user => user.id == req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res
      .status(404)
      .json({ errorMessage: 'The user with the specified ID does not exist.' });
  }
});

//POST
server.post('/api/users', (req, res) => {
  let user = req.body;

  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else if (user === null) {
    res.status(500).json({
      errorMessage: 'There was an error while saving the user to the database',
    });
  } else {
    users.push(user);
    res.status(201).json(users);
  }
});

//DELETE
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  if (id) {
    users = users.filter(user => user.id != Number(id));
    res.status(200).json(users);
  } else {
    res.status(404).json({ errorMessage: 'The user could not be removed' });
  }
});

//PATCH
server.patch('/api/users/:id', (req, res) => {
  let user = users.find(user => user.id == req.params.id);

  //this will get the newest changes that the client is requesting
  const updates = req.body;

  if (!updates.name || !updates.bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else if (user) {
    //if it found the user
    Object.assign(user, updates);
    res.status(200).json(user);
  } else {
    res
      .status(500)
      .json({ errorMessage: 'The user information could not be modified.' });
  }
});

// server.patch('/api/users/:id', (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   if ('name' in changes && 'bio' in changes) {
//     const found = users.find(user => user.id === id);

//     if (found) {
//       Object.assign(found, changes);

//       res.status(200).json(found);
//     } else {
//       res
//         .status(404)
//         .json({ message: 'The user with the specified ID does not exist.' });
//     }
//   } else {
//     res
//       .status(400)
//       .json({ errorMessage: 'Please provide name and bio for the user.' });
//   }
// });

//listen for incoming requests
const port = 8000;

server.listen(port, () =>
  console.log(`\nListening to the best port ${port}\n`)
);
