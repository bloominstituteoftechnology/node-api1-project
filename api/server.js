//build server here

const express = require('express');
const User = require('./users/model.js')

const server = express();

server.use(express.json());


//CRUD

//| POST   | /api/users     | Creates a user using the information 
//sent inside the `request body`.  

server.post('/api/users', async (req, res) => {
    const user = req.body;

        if ( !user.name || !user.bio) {
            res
            .status(400)
            .json({message: "must include name and bio"})
        } 
         
        else {
            try {
                const newUser = await User.insert(user);
                res.status(200).json(newUser);
            } catch (err) {
                res.status(500).json({error: err.message });
            }
        }
})

//| GET    | /api/users    
// | Returns an array users.     

server.get('/api/users', async (req, res) => {
    
    try {
        const users = await User.find();
        res.status(200).json(users)
    }
    catch (err) {
        res.status(500).json({ error: err.message})
    }
})


//| GET    | /api/users/:id | Returns the user object with the specified `id`.        




module.exports = server; // EXPORT YOUR SERVER instead of {}
