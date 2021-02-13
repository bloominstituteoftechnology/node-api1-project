const server = require('./api/server');

const port = 5000;

// START YOUR SERVER HERE

server.listen(5000, () => {
    console.log("server started at localhost:5000")
})