const server = require('./api/server');

const Users = require('./api/users/model');

const port = 3000;



//test function
server.get('/', (req,res) => {
    res.status(200);
    res.type('text/plain')
    res.send('hello world frome xpress')
})




//get all users
server.get('/api/users', (req, res) => {
    Users.find()
    .then(dogs => {
        res.status(200).json(dogs);
    })
    .catch(error => {
        res.status(500).json ({error: error.message});
    })

})

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(`server running on http://localhost${port}`)
})
