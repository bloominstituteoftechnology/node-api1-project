const express = require("express")
const db =require("./model.js")

const server = express()

server.use(express.json())

    server.post("/users", (req, res)=>{
        const newUser = db.insert({
            name: req.body.name,
            bio:  req.body.name
        })
        res.status(201).json(newUser)
    })

    server.get("/users", (req, res)=>{
        const users = db.find()
        res.json(users)
    })

    server.get("/users/:id", (req, res) => {
        const user = db.findById(req.params.id)
        if (user){res.json(user)}
        else {res.status(404).json({message:"user not found"})}

    })

    server.delete("/users/:id", (req,res) => {
        const user = db.findById(req.params.id)
        if (user){
        db.remove(user.id)
        res.status(204).end 
        }
        else {res.status(404).json({message:"User not found"})}
    })

    server.put("/users/:id", (req,res) => {
        const user = db.findById(req.params.id)
        if (user){
            const updatedUser = db.updateUser(user.id,{
                name: req.body.name,
            })
            res.json(updatedUser)}
        else {res.status(404).json({message:"user not found"})}
    })



   

module.exports = server



        server.get("/", (req, res)=>{
            res.json({message:"hello, world"})
        })

        server.get("/users", (req,res)=>{
            const users = db.getUsers()
            res.json(users)

        })

        server.get("/users/:id", (req, res) => {
            const user = db.getUserById(req.params.id)
            if (user){res.json(user)}
            else {res.status(404).json({message:"user not found"})}

        })

        server.post("/users", (req, res)=>{
            const newUser = db.createUser({
                name: req.body.name,
            })
            res.status(201).json(newUser)
        })

        server.put("/users/:id", (req,res) => {
            const user = db.getUserById(req.params.id)
            if (user){
                const updatedUser = db.updateUser(user.id,{
                    name: req.body.name,
                })
                res.json(updatedUser)}
            else {res.status(404).json({message:"user not found"})}
        })

        server.delete("/users/:id", (req,res) => {
            const user = db.getUserById(req.params.id)
            if (user){
            db.deleteUser(user.id)
            res.status(204).end 
            }
            else {res.status(404).json({message:"User not found"})}
        })
