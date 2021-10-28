const { response } = require('./api/server');
const server = require('./api/server');

const PORT = 5000;

// START YOUR SERVER HERE


server.get('/api/users', (req,res) => {
    response.status(200).json()
})

server.listen(PORT, () => {
    console.log('server is running')
})