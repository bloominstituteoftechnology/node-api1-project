const server = require('./api/server');

const port = 3000;

server.get('/', (req, res) => {
    res.status(200);
    res.type('text/plain')
    res.send('hello world frome xpress')
})

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(`server running on http://localhost${port}`)
})
