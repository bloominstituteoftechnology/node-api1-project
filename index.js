const server = require('./api/server');

const port = 5001;

// START YOUR SERVER HERE
server.listen(port, ()=>{
    console.log(`listening on port:${port}`)
})