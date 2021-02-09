// BUILD YOUR SERVER HERE
const express = require('express');
const dbFunctions = require('./users/model')

const app = express();
app.use(express.json());


// get all users
app.get('/users', (req, res) =>{
    dbFunctions.find()
    .then((users) =>{
        res.status(200).json(users)
    })
    .catch(() =>{
        res.status(500).json({message: 'Could not retrieve users'})
    })
});


//get user by specific id
app.get('/users/:id', (req, res) =>{
    const { id } = req.params
    dbFunctions.findById(id)
    .then((user) =>{
        user ? res.status(200).json(user) : res.status(404).json({message: 'User doe not exist'})
        }
    )
});


// add new user
app.post('/users', async (req, res) =>{
    const {name, bio} = req.body
    if(!name || !bio){
        res.status(400).json({message: 'Name and bio are required'})
    } else{
        dbFunctions.insert({name, bio})
        .then((newUser) =>{
            res.status(200).json(newUser)
        })
        .catch(() =>{
            res.status(500).json({message: 'Could not add user'})
        })   
    }
});


// Will edit user
app.put('/users/:id', async(req, res) =>{
    const {name, bio} = req.body;
    const { id } = req.params;

        if(!name || !bio){
                res.status(400).json({message: 'Name and bio are required'})
            } else{
                try{
                    dbFunctions.update(id, {name, bio})
                    const updatedUser = await dbFunctions.update({name, bio}, id )
                    if(updatedUser) {
                        res.status(200).json(updatedUser)
                    } else{
                        res.status(404).json({message: 'User does not exist'})
                    }
                } catch(e){
                    res.status(500).json({error: `${e.message}`})
                }
                
            } 
})


//will delete User
app.delete('/users/:id', async(req, res) =>{
    const { id } = req.params;
    try{
        dbFunctions.remove(id)
        .then((user) =>{
            user === null ? res.status(404).json({message: 'User does not exist'}) : res.status(200).json({message: `User of id: ${id} was deleted`})
        })
    }   catch(e){
        res.status(500).json({message:`Server error: ${e}`})
    }
})



app.use('*', (req, res) =>{
    res.status(404).json({message: '404 not found'});
})

module.exports = app; // EXPORT YOUR SERVER instead of {}
