const server = require('./api/server');

const port = 5000;

// START YOUR SERVER HERE

console.log('Initializing...')

console.log('Nodemon initalized.')

server.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})