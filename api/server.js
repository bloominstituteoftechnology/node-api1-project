// BUILD YOUR SERVER HERE
// IMPORTS
const express = require("express")
const User = require("./users/model")

// INSTANCE OF EXPRESS
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())

// ENDPOINTS
// Test 
server.use('*', (req,res)=>{
    res.status(404).json({
        message: 'not found'
    })
})




// EXPORT
module.exports = server; // EXPORT YOUR SERVER instead of {}
