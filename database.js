const shortid = require('shortid');

let users = [
    { id: "1", 
      name: "Tohru Honda",
      bio: "Lost her mom in a car accident and is now living with the Sohmas." 
    },
    { id: "2", 
      name: "Yuki Sohma",
      bio: "Can turn into the rat of the zodiac. Very quiet and loved by his classmates." 
    },
    { id: "3", 
      name: "Kyo Sohma",
      bio: "Can turn into the cat of the zodiac. Very hot-headed and is always looking to start a fight with Yuki Sohma" 
    },
]

function getUsers() {
	return users
}

function getUserById(id) {
	return users.find(u => u.id === id)
}

function createUser(data) {
	const payload = {
		id: shortid.generate(),
		...data,
	}

	users.push(payload)
	return payload
}

function updateUser(id, data) {
	const index = users.findIndex(u => u.id === id)
	users[index] = {
		...users[index],
		...data,
	}
	
	return users[index]
}

function deleteUser(id) {
	users = users.filter(u => u.id != id)
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}