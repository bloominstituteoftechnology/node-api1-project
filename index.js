const express = require("express");
const shortid = require("shortid");

const server = express();

//middleware
server.use(express.json());

//data
let users = [
  {
    id: shortid.generate(),
    name: "Thing 1",
    bio: "Thing 2's brother; wears red pajamas.",
  },
];

//endpoints
//POST to /api/users creates a user

server.post("/api/users", (req, res) => {
  if (req.body.name && req.body.bio) {
    const userInfo = { id: shortid.generate(), ...req.body };
    users.push(userInfo);
    users.includes(userInfo)
      ? res.status(201).json(users)
      : res.status(500).json({
          errorMessage: "The user could not be saved to the database",
        });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide all pertinant information." });
  }
});

//GET to /api/users returns an array of users

server.get("/api/users", (req, res) => {
  users
    ? res.status(200).json(users)
    : res
        .status(500)
        .json({ errorMessage: "The users information could not be retreived" });
});

//GET to /api/users/:id returns the specified

server.get("/api/users/:id", (req, res) => {
  let id = req.params.id;
  const user = users.find((user) => user.id === id);
  if (users) {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ errorMessage: "User not found, try a new ID" });
    }
  } else {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved" });
  }
});

//DELETE to /api/users/:id removes the specified user and returns the deleted user

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const oldUser = users.find((user) => user.id === id);
  users = users.filter((user) => user.id !== id);
  if (users.includes(oldUser)) {
    res.status(500).json({ errorMessage: "The user could not be removed" });
  } else {
    if (oldUser) {
      res.status(200).json(oldUser);
    } else {
      res.status(404).json({ message: "Cannot delete nonexistant user" });
    }
  }
});

//PUT to /api/users/:id updates the specified user and returns the modified user

// server.put("/api/users/:id", (req, res) => {
//   if (req.body.name && req.body.bio) {
//     const id = req.params.id;
//     let userToBeModded = users.find((user) => user.id === id);
//     if (userToBeModded) {
//       userToBeModded = { id, ...req.body };
//     //   users.includes(userToBeModded) ?
//       res.status(200).json( users) 
//     //   res.status(500).json({errorMessage: 'The user information could not be modified'})
//     } else {
//       res.status(404).json({ errorMessage: "The user does not exist" });
//     }
//   } else {
//       res.status(400).json({errorMessage: 'Please provide name and bio'})
//   }
// });

server.put('/api/users/:id', (req, res) => {
    if(users){
        if(req.body.name && req.body.bio){
            const id = req.params.id;
            if(users.find(user => user.id === id)){
                users.find((user) => user.id === id).name = req.body.name;
                users.find((user) => user.id === id).bio = req.body.bio;
                if(users.find(user => user.id === id)){
                    res.status(200).json(users);
                }
            }else {
                res.status(404).json({errorMessage: 'The user does not exist'})
            }
        }else {
            res.status(400).json({errorMessage: 'Please include a name and a bio'})
        }

    } else{
        res.status(500).json({errorMessage: 'The information could not be modified'}) 
    }

    
    
})

//Set server port
const port = 5000;
server.listen(port, () => {
  console.log(`\n ===API on port ${port}===`);
});


//{id, name: req.body.name, bio: req.body.bio}