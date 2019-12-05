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

//| POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                                              |
// | GET    | /api/users     | Returns an array of all the user objects contained in the database.                                                               |
// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                                                  |
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                                            |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. |