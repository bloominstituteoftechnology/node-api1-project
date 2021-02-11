// BUILD YOUR SERVER HERE

const express=require("express")

 const db=require('./users/model')

const server=express()

server.use(express.json())

server.get('/', (req,res)=>{
    res.send("Hello from server")
})


server.route('/api/users')
.get( (req,res)=>{
 res.json(db.find())
})
.post((req,res)=>{
if(req.body.name || req.body.bio){
    const newUser=db.insert({
        name:req.body.name,
        bio:req.body.bio
    })
  res.status(201).json(newUser)

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
    const id = req.params.id
	const user = db.findById(id)

	if (user) {
        if (!req.body.name ||!req.body.bio) {
   
            res.status(400).json
            ({
                message:`Please provide name and bio for the user.`
            })
        }
        else{
		const updatedUser = db.update(id, {
            name: req.body.name,
            bio:req.body.bio
        })
        

        res.json(updatedUser)
    }
        } else {
		res.status(404).json({
			message: "The user with the specified ID does not exist.",
		})
            }


})
.delete((req,res)=>{
    const id = req.params.id
	const user = db.findById(id)

	if (user) {
		db.remove(id)
		
		res.status(204).end()
	} else {
		res.status(404).json({
			message: "The user with the specified ID does not exist.",
		})
	}
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
