const server = require('./api/server');
const port = 5000;

server.listen(port, ()=> {
    console.log(`Our server is running on port: ${port}`)
})

// START YOUR SERVER HERE
