const shortid = require("shortid");
const { rawListeners } = require("./api/server");
const server = require("./api/server");

const port = 5000;

// START YOUR SERVER HERE

let users = [
  {
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Having fun",
  },
];

///.get

server.get("/api/users", (req, res) => {
  res.json(users);
});

///.post

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  newUser.id = shortid.generate();
  users.push(newUser);
  res.json(newUser);
});

///.delete

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const deleted = users.find((user) => user.id === id);

  users = users.filter((user) => user.id !== id);

  res.json(deleted);
});

///.put 
server.put('/api/users/:id',(req,res)=>{
  const id = req.params.id;
  const change = req.body;
let found = users.find(u => u.is === id);
if(found){
  Object.assign(found,change)
}else{
  res.status(404).json({message: "User not found"})
}
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
