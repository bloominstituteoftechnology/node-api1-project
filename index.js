// implement your API here


const express = require("express");
const Users = require(`./data/db.js`);

const server = express();

server.use(express.json());

server.get("/", function(request, response) {
    response.send({"What's CrAckIn' BIG Stackin'"});
});

// TODO Endpoint Specifications

//  TODO When the client makes a POST request to /api/users:

// If the request body is missing the name or bio property:

// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.

// If the information about the user is valid:

// save the new user the the database.
// respond with HTTP status code 201 (Created).
// return the newly created user document.

// If there's an error while saving the user:

// respond with HTTP status code 500 (Server Error).
// return the following JSON object: { errorMessage: "There was an error while saving the user to the database" }.


// TODO  When the client makes a GET request to /api/users:
server.get(`/api/users`, (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    });
}).catch(err => {
    console.log(err);
    res.status(500).json({
        errorMessage: "The users information could not be retrieved."
    })
})
// If there's an error in retrieving the users from the database:
// respond with HTTP status code 500.
// return the following JSON object: { errorMessage: "The users information could not be retrieved." }.



// TODO When the client makes a GET request to /api/users/:id:

// If the user with the specified id is not found:
// respond with HTTP status code 404 (Not Found).

// return the following JSON object: { message: "The user with the specified ID does not exist." }.

// If there's an error in retrieving the user from the database:
// respond with HTTP status code 500.
// return the following JSON object: { errorMessage: "The user information could not be retrieved." }.


// TODO When the client makes a DELETE request to /api/users/:id:

// If the user with the specified id is not found:
// respond with HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist." }.

// If there's an error in removing the user from the database:
// respond with HTTP status code 500.
// return the following JSON object: { errorMessage: "The user could not be removed" }.

// TODO When the client makes a PUT request to /api/users/:id:

// If the user with the specified id is not found:
// respond with HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist." }.

// If the request body is missing the name or bio property:
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.

// If there's an error when updating the user:
// respond with HTTP status code 500.
// return the following JSON object: { errorMessage: "The user information could not be modified." }.

// If the user is found and the new information is valid:
// update the user document in the database using the new information sent in the request body.
// respond with HTTP status code 200 (OK).
// return the newly updated user document.


// TODO Stretch Problems
// To work on the stretch problems you'll need to enable the cors middleware. Follow these steps:

// add the cors npm module: npm i cors.
// add server.use(cors()) after server.use(express.json()).


// Create a new React application and connect it to your server:

// the React application can be anywhere, but, for this project create it inside the folder for the solution.
// connect to the /api/users endpoint in the API and show the list of users.
// add a delete button to each displayed user that will remove it from the server.
// add forms to add and update data.
// Style the list of users however you see fit.