// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./model.js')

const server = express();

server.use(express.json());


//CRUD

//| POST   | /api/users     | Creates a user using the information 
//sent inside the `request body`.  

server.post('./api/users', async (req, res) => {
    const user = req.body;

        if ( !user.name || !user.bio) {
            res.status(400).json({message: "must include name and bio"})
        } 
         
        else {
            try {
                const newUser = await User.create(user);
                res.status(200).json(newUser);
            } catch (err) {
                res.status(500).json({error: err.message});
            }
        }
})

//| GET    | /api/users    
// | Returns an array users.     







module.exports = server; // EXPORT YOUR SERVER instead of {}
