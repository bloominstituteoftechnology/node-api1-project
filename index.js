const express = require('express')


	const server = express()

	let users = []


		server.use(express.json())

	server.get('/', (req,res)=>{
		res.status(200).json({api:'Welcome to users API'})
		})

	server.get('/api/users',(req,res)=>{//get users
		res.status(201).json({users:users})
	})

	server.get('/api/users/:id', (req,res)=>{//get single user

		const id_ = parseInt(req.params.id)
		let there = false
		const user = users.filter(usr=>{
			if(usr.id===id_){
				there = true
				res.status(201).json({user:usr})
			}
			
		})

		if(!user){
		return res.status(404).json({ message: 'The user with the specified ID does not exist.'})
		}else if(!user.bio || !user.name){
		res.status(500).json({user:'The user information could not be retrieved.'})
		}else{
		res.status(201).json({user:user[0]})
		}


	})



	server.post('/api/users', (req,res)=>{//add new user
		const newUser = req.body
		newUser.id = users.length
		if(!newUser.name || !newUser.bio){
			return res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
		}else{
			users.push(newUser)
			res.status(201).json({created:newUser})
			if(!users.find(newUser)){
				return res.status(500).json({ errorMessage: 'There was an error while saving the user to the database'})
			}
		}
		
	})




	server.delete('/api/users/:id', (req,res)=>{//delete a user
		const id_ = parseInt(req.params.id)
		let hated = false;
	

		users = users.filter(user=>{

			if(user.id === id_){
				hated = user

				if(user.name === 'Guy'){
			return	res.status(500).json({errorMessage: "The user could not be removed"})
					}
			} 

			return user.id !== id_
		})

			if(!hated){
			return	res.status(404).json({message: "The user with the specified ID does not exist."})
			}else{
			return res.status(201).json({newUsers:users})
			}

	})





	server.put('/api/users/:id', (req,res)=>{
			const id_ = parseInt(req.params.id)
			const uptUser = req.body
			let found = false
				if(!uptUser.name || !uptUser.bio){
					return res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
				}


				users.forEach((user,i)=>{
					if(user.id === id_){
						found = true
						user = uptUser
						if(user){
						return	res.status(200).json({updated:user})
					}else{
						return	res.status(500).json({errorMessage: "The user information could not be modified."})
					}
				}
					
					 if(i === users.length && !found){
						return res.status(404).json({message: "The user with the specified ID does not exist." })
					}
				})
	})



	const PORT = 5000

	server.listen(PORT, ()=>{
		console.log(`listening on port ${PORT}`)
	})