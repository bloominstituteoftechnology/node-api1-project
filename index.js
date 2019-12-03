const express = require("express"); // CommonJS Modules
const db = require("./data/db"); // <<<<< 1: import the database file
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send({ api: "up and running..." });
});

///GET///

server.get("/users", (req, res) => {
  // get the list of users from the database
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log("error on GET /users", error);
      res
        .status(500)
        .json({ errorMessage: "error getting list of users from database" });
    });
});

server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    db 
        .findById(id)
        .then(user => {
          if (user) {
          res.status(200).json(user); 
                
            } else {
              res.status(404).json({ 
                message: 'No such user exists'
            })
          }})
       
        .catch(err => res.status(500).json({
            error: 'User info could not be retrieved, please try again'
        }))
      
})



server.post("/users", (req, res) => {
  const userData = req.body;

  // call the db and add the hub
  db.insert(userData)
    .then(hub => {
      res.status(201).json(hub);
    })

    .catch(error => {
      if (!userData.name || !userData.bio) {
        console.log("error on POST /users", error);
        res.status(400).json({ errorMessage: "Bad Request" });
      } else {
        console.log("error on POST /users", error);
        res.status(500).json({ errorMessage: "error adding the user" });
      }
    });
});

///DELETE///

server.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(removed => {
      if (removed) {
        res.status(200).json({ message: "user removed successfully", removed });
      } else {
        // there was no hub with that id
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(error => {
      console.log("error on DELETE /hubs/:id", error);
      res.status(500).json({ errorMessage: "error removing the hub" });
    });
});

///PUT///

server.put('/users/:id', (req, res) => {
  const userData = req.body;
  const id=req.params.id

  db.update(id, userData)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the user',
    });
  });
});

const port = 4000;
server.listen(port, () =>
  console.log(`\n ** API running on port ${port} **\n`)
);
