const express = require('express');
const shortid = require('shortid');
// console.log(shortid.generate());
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ hello: "My first API"})
})

let users = [
  {
    id: "1", // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane",  // String, required
  },
]

//POST /users
server.post('/users', (req,res) => {
  const data = req.body;
  if(!data.name || !data.bio) {
    res.status(400).json({errorMessage : "Please provide name and bio for the user."})
  } else {
    users.push({ id: shortid.generate(), name: data.name, bio: data.bio })
      ? res.status(201).json({ data: users})
      : res.status(500).json({errorMessage: "There was an error while saving the user to the database"});
  };
});

//GET /users
server.get("/users", (req, res) => {
  res.status(200).json({data: users });
  //Q: when would there be an error in retreiving users?? If there are none??
  //poss solution: if (ln33) {ln33} else {error}
  // (ln33 || error)
//TODO: If there's an error in retrieving the users from the database:
// respond with HTTP status code 500.
// return the following JSON object: { errorMessage: "The users information could not be retrieved." }.
});

//GET /users/:id
server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const found = users.find(u => u.id == id)
  if(!found) {
    res.status(404).json({message: "The user with the specified ID does not exist."})
  } else {
    res.status(200).json({ data: found })
  }
  //again this makes no sense:
//   If there's an error in retrieving the user from the database:
// respond with HTTP status code 500.
// return the following JSON object: { errorMessage: "The user information could not be retrieved." }.
})

//DELETE /users/:id
server.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const found = users.find(u => u.id == id)
  users = users.filter(u => u.id != id)
  if(!found) {
    res.status(404).json({message: "The user with the specified ID does not exist."})
  } else {
    res.status(200).json({ data: users })
  };
  //again this makes no sense:
  //   If there's an error in retrieving the user from the database:
  // respond with HTTP status code 500.
  // return the following JSON object: { errorMessage: "The user information could not be retrieved." }.
});

//PUT /users/"id"
server.put("/users/:id", (req,res) => {
  const id = req.params.id;
  const found = users.find(u => u.id == id)
  const changes = req.body;

  if (!found) {
    res.status(404).json({ message: "The user with the specified ID does not exist." });
  } else {
    if(!changes.name || !changes.bio) {
      res.status(400).json({errorMessage : "Please provide name and bio for the user."})
    } else {
          Object.assign(found, changes)
          ? res.status(200).json({ data: users })
          : res.status(500).json({errorMessage: "The user information could not be modified."});
    };
}
})


const port = 5000;
server.listen(port, () => console.log("server running ..."));