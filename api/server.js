// Using the express server
const express = require('express')
// import express user-model with express & initthe express app
const User = require('./user-model');
const server = express();

// Start the app and configure it with the express json to read body req 1 day
server.use(express.json());

/*
Method	URL	Description
POST	/api/users	Creates a user using the information 
sent inside the request body.
GET	/api/users	Returns an array users.
GET	/api/users/:id	Returns the user object with the
specified id.
DELETE	/api/users/:id	Removes the user with the specified 
id and returns the deleted user.
PUT	/api/users/:id	Updates the user with the specified id 
using data from the request body. Returns the modified user
*/

/*
Endpoint Specifications
When the client makes a POST request to /api/users:

If the request body is missing the name or bio property:

respond with HTTP status code 400 (Bad Request).
return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
If the information about the user is valid:

save the new user the the database.
respond with HTTP status code 201 (Created).
return the newly created user document.
If there's an error while saving the user:

respond with HTTP status code 500 (Server Error).
return the following JSON object: { errorMessage: "There was an error while saving the user to the database" }.
When the client makes a GET request to /api/users:

If there's an error in retrieving the users from the database:
respond with HTTP status code 500.
return the following JSON object: { errorMessage: "The users information could not be retrieved." }.
When the client makes a GET request to /api/users/:id:

If the user with the specified id is not found:

respond with HTTP status code 404 (Not Found).
return the following JSON object: { message: "The user with the specified ID does not exist." }.
If there's an error in retrieving the user from the database:

respond with HTTP status code 500.
return the following JSON object: { errorMessage: "The user information could not be retrieved." }.
When the client makes a DELETE request to /api/users/:id:

If the user with the specified id is not found:

respond with HTTP status code 404 (Not Found).
return the following JSON object: { message: "The user with the specified ID does not exist." }.
If there's an error in removing the user from the database:

respond with HTTP status code 500.
return the following JSON object: { errorMessage: "The user could not be removed" }.
When the client makes a PUT request to /api/users/:id:

If the user with the specified id is not found:

respond with HTTP status code 404 (Not Found).
return the following JSON object: { message: "The user with the specified ID does not exist." }.
If the request body is missing the name or bio property:

respond with HTTP status code 400 (Bad Request).
return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
If there's an error when updating the user:

respond with HTTP status code 500.
return the following JSON object: { errorMessage: "The user information could not be modified." }.
If the user is found and the new information is valid:

update the user document in the database using the new information sent in the request body.
respond with HTTP status code 200 (OK).
return the newly updated user document.
*/
// Endpoints
// [GET] /

server.post('/api/users', async(req,res) =>{
    const user = req.body;
    if(!user.name){
        res.status(400).json({message:'your name is required'})
    } else{
            // Database Reactions
        try{
            res.json({message:'name is'})
            const theUser = await User.create(user.name,user.bio);
            res.status(201).json(theUser);
        } catch (error){
            // Error control
            res.status(500).json({message:error.message})
        } 
    } 

});





server.get('/', (req,res) => {
    res.json({message:'hello this is said to work'})
})


module.exports = server