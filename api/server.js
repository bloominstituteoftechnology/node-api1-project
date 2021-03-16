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

server.get('/api/users/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findById(id);
        res.json(user)
    }

        catch (err) {
            res.status(500).json({ error: err.message})

    }

})


//| DELETE | /api/users/:id | Removes the user with the specified `id` 
//and returns the deleted user.    

server.delete('/api/users/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.remove(id);
        if (user) {
            res.status(200).json(user);
            
        } else {
            res.status(404).json({message: 'bad id'})
            
        }
        
    }

        catch (err) {
            res.status(500).json({ error: err.message})

    }

})

//| PUT    | /api/users/:id | Updates the user with the specified 
//`id` using data from the `request body`. Returns the modified user |

server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const  user= req.body;

    try {
        const updatedUser = await User.update(id, user);
        if (updatedUser) {
            res.json(updatedUser);

        }else{
            res.status(404).json({message: "bda id"});
        }
    } catch (err) {
        res.status(500).json({error:err})
    }
})

   

module.exports = server; // EXPORT YOUR SERVER instead of {}
