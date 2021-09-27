
const server = require('./api/server');

const port = 5000;
console.log(process.argv[2])
// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(`listening on port ${port}`)
})