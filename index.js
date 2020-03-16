const express = require('express');

const server = express();


// POST request.../api/users
//Creates a user using the information sent inside the request body.


// GET request.../api/users
//Returns an array users.


// GET request.../api/users/:id
//Returns the user object with the specified id

// DELETE request.../api/users/:id
//Removes the user with the specified id and returns the deleted user


// PATCH request.../api/users/:id
//Updates the user with the specified id using data from the request body. Returns the modified user