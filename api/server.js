// BUILD YOUR SERVER HERE

const express = require('express');
const { generate } = require('shortid');
const dbFunctions = require('./users/model');
console.log(dbFunctions)



const app = express();
app.use(express.json())


    app.post("/api/users", (req,res) => {
    console.log("this is the re", req.body)
    const user = req.body    
    if (!user.name || !user.bio) {
        res.status(400).json({message:"Please provide name and bio for the user" })
    } else {
        dbFunctions.insert(req.body)
        .then( user => {
            res.status(201).json(user) //do we need to return new user with id?
        })
        .catch(res.status(500).json({message: "There was an error while saving the user to the database"}))
    }
})


// app.get("/",(req, res) => {
//     dbFunctions.find()
//     .then(users => {
//         res.json(users)
//     })
//     .catch(res.status(500).json({message:"error"}))
// })




app.use("*", (req, res) => {
    res.status(404).json({message: "404 Not Found)*:"})
})

    // app.post("/api/users",)



module.exports = {app}; // EXPORT YOUR SERVER instead of {}
