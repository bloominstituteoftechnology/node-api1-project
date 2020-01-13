// implement your API here// install express and cors (npm packages)
// STEP 1: flesh out a dummy server
// STEP 2: flesh out the five endpoints (will use those helpers)
// imports 
const express = require('express')
const cors = require('cors')

// instantiate an express app
const app = express()
// plug extra functionality to our app
// we need to be able to read req.body
app.use(express.json())
// we need to enable CORS so this server works for all origins
app.use(cors())