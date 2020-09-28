const express = require('express');
const shortid = require('shortid');
console.log(shortid.generate());
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ hello: "My first API"})
})

const users = [
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
    res.status(201).json({ data: users})
  };
  //I assume this is not relevant, or that I'm missing something to do it:
// If there's an error while saving the user:
// respond with HTTP status code 500 (Server Error).
// return the following JSON object: { errorMessage: "There was an error while saving the user to the database" }.
});

//GET /users
server.get("/users", (req, res) => {
  res.status(200).json({data: users });
  //Q: when would there be an error in retreiving users?? If there are none??
//TODO: If there's an error in retrieving the users from the database:
// respond with HTTP status code 500.
// return the following JSON object: { errorMessage: "The users information could not be retrieved." }.
});

const port = 5000;
server.listen(port, () => console.log("server running ..."));