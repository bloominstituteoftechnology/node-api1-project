let users = []
// R - READ - GET
function getUsers() {
	return users
}

function getUserById(id) {
	return users.find(u => u.id === id)
}
// C - CREATE - POST
function createUser(data) {
	const payload = {
		id: String(users.length + 1),
		...data,
	}

	users.push(payload)
	return payload
}
// U - UPDATE - PUT
function updateUser(id, data) {
	const index = users.findIndex(u => u.id === id)
	users[index] = {
		...users[index],
		...data,
	}
	
	return users[index]
}
// D - DELETE - DELETE
function deleteUser(id) {
    users = users.filter(u => u.id != id)
    const oldindex = users.findIndex(u => u.id === id)
	users[oldindex] = {
		...users[oldindex],
		...data,
    }
    return users[oldindex]
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}