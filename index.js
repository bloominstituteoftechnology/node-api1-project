const shortid = require('shortid');
const server = require('./api/server');

const port = 5000;


// START YOUR SERVER HERE

server.app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})