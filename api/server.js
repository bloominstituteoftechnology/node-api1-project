// BUILD YOUR SERVER HERE
const express = require("express")
const server = express();
server.use(express.json());
let user = require('./users/model')

server.post("/server/user", (req,res)=>{
    const {name, bio} = req.body
    if(!name || !bio) {
        res.status(400).json({message: "Please provide name and bio for the user" })
    }
})

module.exports = {server}; // EXPORT YOUR SERVER instead of {}
