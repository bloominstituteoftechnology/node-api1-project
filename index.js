// importing express
let express = require('express');

// create a server
let server = express();

// middleware
server.use( express.json() );
// is how to parse json from the body

// base model for user DB
let users = [
    {
        id: 1,
        name: "Fernando",
        bio: "Lambda Student"
    },
    {
        id: 2,
        name: "Tom",
        bio: "Random Person"
    }
]



// handle POST ============================================== POST =============
server.post('/api/users', (req, res) => {
    let user = req.body;
    if( !user.name || !user.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else if(!user) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" }) 
        // if data structure/format does not match up with back end, 500 error
    } else {
        users.push(user) //better here or before if statement?
        res.status(201).json(user)
    }
} )

// handle GET ============================================== GET ===============
server.get('/', (req, res) => {
    res.json({api: 'Up'}); // base request for '/' replying with api Up message
});
server.get('/api/users', (req, res) => {
    if(!users){
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    } else {
        res.status(200).json(users);
    }
})
server.get('/api/users/:id', (req, res) => {
    let id = req.params.id;

    // if(users.id !== Number(id)){
    //     res.status(404).json({ message: "The user with the specified ID does not exist." })
    // } else if(!users){
    //     res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    // } else res.status(200).json(users.filter(user.id === Number(id)))

    
    // users = users.filter(user => user.id === Number(id));
    // if(!users.id){
    //     res.status(404).json({ message: "The user with the specified ID does not exist." })
    // } else if(!users){
    //     res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    // } else res.status(200).json(users)

    users = users.filter(user => user.id === Number(id))
    if(!users[0]){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if(!users){
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    } else res.status(200).json(users)

})

// handle DELETE ============================================== DELETE =========
server.delete('/api/users/:id', (req, res) => {
    let id = req.params.id;
    
    let filteredUsers = users.filter(user => user.id !== Number(id))
    if(filteredUsers.id){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if(!users){
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    } else res.status(200).json(filteredUsers)

})


// handle PUT ============================================== PUT ===============

// listen to incoming requests
let port = 1123;
server.listen(port, () => console.log(`\n === API is running on port ${port} === \n`));