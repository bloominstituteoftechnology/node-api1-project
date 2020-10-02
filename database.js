
let users = [
	{ id: "1", name: "Jane Doe", bio: "here" },
	{ id: "2", name: "John Doe", bio: "here" },
	{ id: "3", name: "Jack Doe", bio: "here" },
]


function getUsers() {
	return users
}

function getUserById(id) {
	return users.find(u => u.id === id)
}

function deleteUser(id) {
	users = users.filter(u => u.id != id)
}


function createUser(data) {
	const payload = {
		id: String(users.length + 1),
		...data,
	}

	users.push(payload)
	return payload
}

module.exports = {
	getUsers,
	createUser,
	getUserById,
	deleteUser
}