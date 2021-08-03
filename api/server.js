// BUILD YOUR SERVER HERE
const express = require("express")
const User = require("./users/model")
const server = express()
server.use(express.json())



server.get( "/api/users",(req,res) => {

User.find()
.then(event => {
    res.status(200).json(event)
})
.catch(err =>{
    res.status(500).json({ message: err.message})
})

})


server.get("/api/users/:id", (req,res) => {

const {id} = req.params

User.findById(id)
.then(event => {
    if(!event){
    res.status(404).json({message: ` ${id} not found `})
}
else{
    res.status(200).json(event)
}

})
.catch(err => {
    res.status(500).json({ message: err.message})
})
})


server.post("/api/users/:id")


server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    User.remove(id)
      .then((del) => {
        if (!del) {
          res
            .status(404)
            .json({ message: "Specified ID does not exist" });
        } else {
          res.json(del);
        }
      })
      .catch(() => {
        res.status(500).json({
          message: "User is not removed",
        });
      });
  });



server.put("/api/users/:id")



module.exports = server; // EXPORT YOUR SERVER instead of {}
