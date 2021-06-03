console.log("it works!") //testing nodemon


const server = require('./api/server');

const port = 5000;

// START YOUR SERVER HERE

server.listen(5000, ()=>{
    console.log("Server running on 5000")
})



//server - has the CRUD get, post, put, delete
//api/model.js - has the async/await (These are the 'actions' for the get, post, put, delete)
//index.js - has just the server listener to start the server
