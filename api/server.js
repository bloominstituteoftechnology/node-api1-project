const express = require("express")
const db = require("./users/model")
const server = express()

// this is installing some middleware to allow Express
// to parse incoming JSON request bodies
server.use(express.json())

// BUILD YOUR SERVER HERE

server.get("/api/users", (req, res) => {
    db.find().then(users => {
      res.json(users)
    })
    .catch((err) => {
        res.status(500).json({
            message: `The users information could not be retrieved: ${err}`
        })
    })
})
//
/* In the async and await format as db.find() is a promise
server.get("/api/users", async(req, res) => {
    const users = await
    db.find()
    res.json(users)
})
*/

server.get("/api/users/:id", async(req, res)=> {
    const user = await
    db.findById(req.params.id)
    console.log(user)
    if (user) {
        res.json(user)
    } else if (!user) {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        }) 
    } else {
            res.status(500).json({
                message: "The user information could not be retrieved"
            })
        
        
    }
    
})

server.post("/api/users", async(req, res) => {
    const newUser = await
    db.insert({ name: req.body.name, bio: req.body.bio})
    if (!req.body.name || !req.body.bio){
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user"
        })
    } else if (newUser) {
        res.json(newUser)
    } else {

        res.status(500).json({
            message: "There was an error while saving the user to the database",
        })
    }
    
})

server.put("/api/users/:id", async(req, res) => {
    // const id = req.params.id;
    const user = db.findById(req.params.id);
    const updated = await
     db.update(user.id, { 
        name: req.body.name || user.name,
        bio: req.body.bio || user.bio
    } )
    if (user) {
        res.json(updated)
    } else {
        res.status(505).json({
            message: "Please provide name and bio for the user",
        })
    }

})

server.delete("/api/users/:id", async(req, res) => {
    const user = await
    db.remove(req.params.id)
    if (user) {
        res.json({user, 
            
                message: "user is deleted"
            })
    } else if (!user)
    {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        }) 
    } else {
            res.status(500).json({
                message: "The user cannot be removed"
            })
        }
})

// EXPORT YOUR SERVER instead of {} - Done
module.exports = server;
