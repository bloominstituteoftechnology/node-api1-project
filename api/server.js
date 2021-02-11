// BUILD YOUR SERVER HERE

const express=require("express")

 const db=require('./users/model')

const server=express()

server.use(express.json())

server.get('/', (req,res)=>{
    res.send("Hello from server")
})


server.route('/api/users')
.get(async (req,res)=>{
await res.json(db.find())
})
.post((req,res)=>{
if(req.body.name || req.body.bio){
    const newUser=db.insert({
        name:req.body.name,
        bio:req.body.bio
    })

}else{
    res.status(400).json({
        msg: "Please provide name and bio for the user"
    })
}

})

server.route('/api/users/:id')
.get((req,res)=>{
const id=req.params.id
const user=db.findById(id)
if(!user){
    res.status(404).json({
        msg:"User not found"
    })
}else{
res.json(user)
    }

})
.put((req,res)=>{

})
.delete((req,res)=>{

})




module.exports = server; // EXPORT YOUR SERVER instead of {}
