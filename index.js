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

// [post] create a new user
server.post("/api/users", (req,res)=>{
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(422).json({message:"Name and bio are required"})
    }else{
        Users.insert(newUser)
        .then(user=>{
            res.json(user)
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }
})


// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(`server running on http://localhost${port}`)
})
