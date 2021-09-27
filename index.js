const server = require('./api/server');

const port = 5000;

// START YOUR SERVER HERE
console.log(`First console log`)
console.log(process.env.LANG) // computer stuff
console.log(process.argv[2]) // first arg from command line


server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})