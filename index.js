const server = require('./api/server');

const port = 9000;

// START YOUR SERVER HERE
// console.log("Why Hello!")
server.listen(port, ()=>{
    console.log("Server running on port 9000")
})
