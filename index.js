const server = require('./api/server.js');



const PORT = 5000;

// START YOUR SERVER HERE

server.listen(PORT, () => {
    console.log(`\n *** listening on port ${PORT}*** \n`)
})