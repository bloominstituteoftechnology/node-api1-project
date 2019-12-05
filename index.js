// implement your API here

const express = require("express");

const user = require("./data/db.js");

const port = 5000;
const host = "127.0.0.1";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "" });
});

// Write endpoints to perform the following queries
// Inside index.js add the code necessary to implement the following endpoints:

// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.  

app.post("/api/users", (req, res) => {
    const newUser = {
      name: req.body.name,
      bio: req.body.bio
    };
  
    if (!req.body.name || !req.body.bio) {
      return res
      // - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    }
  
    user
      .insert(newUser)
      .then(user => {
// - save the new _user_ the the database.
//   - respond with HTTP status code `201` (Created).
//   - return the newly created _user document_.
        if (req.body.name && req.body.bio) {
          return res.status(201).json("Created");
        }
      })
      .catch(error => {
        // - respond with HTTP status code `500` (Server Error).
        // - return the following JSON object: `{ errorMessage: "There was an error while saving the user to the database" }`.
        res.status(500).json({
          errorMessage: "There was an error while saving the user to the database"
        });
      });
  });

//   - If there's an error while saving the _user_:
//   - respond with HTTP status code `500` (Server Error).
//   - return the following JSON object: `{ errorMessage: "There was an error while saving the user to the database" }`.


// | GET    | /api/users     | Returns an array of all the user objects contained in the database.     

// - If there's an error in retrieving the _users_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ errorMessage: "The users information could not be retrieved." }`.

//| GET    | /api/users/:id | Returns the user object with the specified `id`.    

// - If the _user_ with the specified `id` is not found:
//   - respond with HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

// - If there's an error in retrieving the _user_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ errorMessage: "The user information could not be retrieved." }`.


// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.   

// - If the _user_ with the specified `id` is not found:

//   - respond with HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

// - If there's an error in removing the _user_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ errorMessage: "The user could not be removed" }`.

// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. |