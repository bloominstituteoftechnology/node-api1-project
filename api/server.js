// BUILD YOUR SERVER HERE
const express = require('express');
const user = require('./users/model');
const server = express();

server.use(express.json());

server.use('*', (req, res) => {
  res.status(200).json({message:'No more hello world'})
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
