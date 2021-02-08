const server = require('./api/server');
const port = 5000

server.listen(port, ()=> {
  console.log(`Server is running on port: ${port} `)
})

// const port = 5000;
// const generate = require('shortid').generate
// const users = [
//   {id:generate(), name:"bob", job:'clown'},
//   {id:generate(), name:"tom", job:'mattress salesman'},
//   {id:generate(), name:"steve", job:'racecar driver'},
//   {id:generate(), name:"jake", job:'alcoholic'}
// ]

// app.get('/api/users', (req, res) => {
//   res.status(200).json(users)
// })

// app.get('/api/users/:id', (req,res) => {
//   const id = req.params.id
//   const user = users.find(user => user.id === id)
//   if(!user){
//     res.status(404).json({message: `ID: ${id} does not exist`})
//   }else {
//     res.status(200).json(user)
//   }
// })

// app.post('/api/users', (req, res) => {
//   const {name, job} = req.body
//   if(!name || !job) {
//     res.status(404).json({message: "404 Page not found"})
//   }else {
//     res.status(200)
//   }
// })





// app.use('*', (req, res) => { //.use covers all types of requests. get/post/etc..
//   res.status(404).json({message: '404, Page not Found )*:'})
// })


