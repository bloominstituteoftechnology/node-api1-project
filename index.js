const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Hello World')
})


server.get()

// START YOUR SERVER HERE
server.listen(8000, () =>{
    console.log('API running on port 8000')
})


// | Method | URL            | Description                                                                                            |
// | ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
// | GET    | /api/users     | Returns an array users.                                                                                |
// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |