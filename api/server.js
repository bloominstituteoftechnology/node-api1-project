// BUILD YOUR SERVER HERE
const express = require("express")
const db = require("./users/model")

const server = express()
server.use(express.json())

server.get ("/", (req,res)=>{
    res.json({message:"hello world"})
})
server.post("/users",(req, res)=>{
    const newUser = db.insert({
        id: db.shortid,
        name:req.body.name,
        bio:req.body.bio,
    })
    res.status(201).json(newUser)
})


server.get ("/users", (req, res)=>{
    const users = db.find()
    res.json(users)
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
