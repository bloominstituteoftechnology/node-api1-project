const express = require("express");
const shortid = require("shortid");

const port = 5000;

const server = express();

server.use(express.json());

// POST	/api/users	Creates a user using the information sent inside the request body.
// GET	/api/users	Returns an array users.
// GET	/api/users/:id	Returns the user object with the specified id.
// DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
// PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}...`);
});
