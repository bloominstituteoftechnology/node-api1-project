const server = require('./api/server.js');
const port = 9000;

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(`listening on port ${port}`)
})
