// BUILD YOUR SERVER HERE
// const User = require("./model.js");
const express = require("express");
const User = require("./users/model.js");
const server = express();

server.use(express.json());

// Add the code necessary in index.js and api/server.js to create a Web API and
// implement the following endpoints:
server.get("/", (req, res) => {
  res.json({ hello: "world" });
});
// Method	URL	Description

// POST	/api/users	Creates a user using the information sent inside the request body.
server.post("/api/users", async (req, res) => {
  const user = req.body;
  //   console.log("USER CONSOLE", user);
  if (!user.name || !user.bio) {
    res.status(400).json({ message: "name and bio required" });
  } else {
    try {
      const newUser = await User.insert(user);
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  }
});

// GET	/api/users	Returns an array users.
server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// GET	/api/users/:id	Returns the user object with the specified id.

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "bad id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: err });
  }
});

// DELETE	/api/users/:id	Removes the user with the specified id and
// returns the deleted user.

// PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user

// Each User resource should conform to the following structure (AKA schema):

// {
//   id: "a_unique_id", // String, hint: use the installed `shortid` npm package to generate it
//   name: "Jane Doe",  // String, required
//   bio: "Having fun", // String, required
// }

// Database Access Functions
// You can find them inside api/users/model.js. All of these functions return Promises.

// find Resolves to the list of users (or empty array).
// findById Takes an id and resolves to the user with that id (or null if the id does not exist).
// insert Takes a new user { name, bio } and resolves to the the newly created user { id, name, bio }.
// update Takes an id and an existing user { name, bio } and resolves the updated user { id, name, bio} (or null if the id does not exist).
// remove Takes an id and resolves to the deleted user { id, name, bio }.

// Endpoint Specifications
// When the client makes a POST request to /api/users:

// If the request body is missing the name or bio property:

// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { message: "Please provide name and bio for the user" }.
// If the information about the user is valid:

// save the new user the the database.
// respond with HTTP status code 201 (Created).
// return the newly created user document including its id.
// If there's an error while saving the user:

// respond with HTTP status code 500 (Server Error).
// return the following JSON object: { message: "There was an error while saving the user to the database" }.
// When the client makes a GET request to /api/users:

// If there's an error in retrieving the users from the database:
// respond with HTTP status code 500.
// return the following JSON object: { message: "The users information could not be retrieved" }.
// When the client makes a GET request to /api/users/:id:

// If the user with the specified id is not found:

// respond with HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist" }.
// If there's an error in retrieving the user from the database:

// respond with HTTP status code 500.
// return the following JSON object: { message: "The user information could not be retrieved" }.
// When the client makes a DELETE request to /api/users/:id:

// If the user with the specified id is not found:

// respond with HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist" }.
// If there's an error in removing the user from the database:

// respond with HTTP status code 500.
// return the following JSON object: { message: "The user could not be removed" }.
// When the client makes a PUT request to /api/users/:id:

// If the user with the specified id is not found:

// respond with HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist" }.
// If the request body is missing the name or bio property:

// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { message: "Please provide name and bio for the user" }.
// If there's an error when updating the user:

// respond with HTTP status code 500.
// return the following JSON object: { message: "The user information could not be modified" }.
// If the user is found and the new information is valid:

// update the user document in the database using the new information sent in the request body.
// respond with HTTP status code 200 (OK).
// return the newly updated user document.

module.exports = server; // EXPORT YOUR SERVER instead of {}
