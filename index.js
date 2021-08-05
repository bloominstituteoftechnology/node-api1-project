const server = require('./api/server');

const port = 5000;
// START YOUR SERVER HERE
//This is what will run your server and .listen sets your server up to listen for requests
server.listen(5000, ()=>{
    console.log("Server up and running on port 5000")
})