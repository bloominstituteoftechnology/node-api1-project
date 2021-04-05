// BUILD YOUR SERVER HERE

const express = require("express")
const Users = require("./users/model.js")

const server = express()

server.use(express.json())

// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
// server.post('/api/users', (req,res)=>{

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
        res.status(200).json(users)
    })
    .catch(err=>{
        res.status(500).json({message: err.message})
    })
})
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

//CATCH ALL
server.use("*",(req,res)=>{
    res.status(404).json({message:"Error 404, please try again."})
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
