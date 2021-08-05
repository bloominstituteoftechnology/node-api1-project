// BUILD YOUR SERVER HERE
//importing express
const express = require("express")
//creates the server
const server = express()

const Users = require('../api/users/model')
//global midleware
server.use(express.json())



//ENDPOINTS
//"*" works with any request
server.use("*", (req,res)=>{
    res.status(404).json({message:"Not Found"})
})


module.exports = server // EXPORT YOUR SERVER instead of {}
