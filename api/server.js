// BUILD YOUR SERVER HERE

const express = require("express")
const Users = require("./users/model.js")

const server = express()

server.use(express.json())

// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
// server.post('/api/users', (req,res)=>{
server.post('/api/users', (req,res)=>{
    const newUser = req.body

    if(!newUser.name || !newUser.bio){
        res.status(404).json("Please add a name and bio.")
    }else{
        Users.insert(newUser)
        .then(users=>{
            res.status(201).json(users)
        })
        .catch(err=>{
            res.status(500).json({message: err.message})
        })
    }
})


// })
// | GET    | /api/users     | Returns an array users.  
server.get('/api/users', (req,res)=>{
    Users.find()
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(err=>{
        res.status(500).json({message: err.message})
    })
})
// | GET    | /api/users/:id | Returns the user object with the specified `id`. 
server.get('/api/users/:id',(req,res)=>{
    const {id} = req.params

    Users.findById(id)
    .then(users=>{
        if(!users){
            res.status(404).json("User not found")
        }else{
            res.status(200).json(users)
        }
        
    })
    .catch(err=>{
        res.status(500).json({message: err.message})
    })
})
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.  
server.delete('/api/users/:id', async (req,res)=>{
   
   try{
    const {id} = req.params
    const deletedUser = await Users.remove(id)
    if(!deletedUser){
        res.status(422).json("User doesn't exist.")
    }else{
        res.status(201).json(deletedUser)
    }
   }catch(err){
    res.status(500).json({message: err.message})
   }


})

// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
server.put('/api/users/:id',async(req,res)=>{
    const {id} = req.params
    const changes = req.body
    try{
        if(!changes.name || !changes.bio){
            res.status(422).json("Name and weight required.")
        }else{
            const updatedUser = await Users.update(id, changes)
            if(!updatedUser){
                res.status(422).json("User doesn't exist.")
            }else{
                res.status(201).json(updatedUser)
            }
            
        }
        
    }catch(err){
        res.status(500).json({message: err.message})
    }
    
    
    // Users.update()
    // .then(users=>{

    // })
    // .catch(err=>{
    //     res.status(500).json({message: err.message})
    // })
})


//CATCH ALL
server.use("*",(req,res)=>{
    res.status(404).json({message:"Error 404, please try again."})
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
