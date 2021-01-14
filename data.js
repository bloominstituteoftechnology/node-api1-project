module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}

let users = [
    {
        id:"1",
        name:"Walter White",
        bio:"Husband",
    },
    {
        id:"2",
        name:"Skylar White",
        bio:"Wife",
    },
    {
        id:"3",
        name:"Jesse Pinkman",
        bio:"Partner",
    },
    {
        id:"4",
        name:"Gus Fring",
        bio:"Boss",
    },
    {
        id:"5",
        name:"Saul Goodman",
        bio:"Lawyer",
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
        id: String(users.length +1),
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
    return users [index]
}

function deleteUser(id){
    users = users.filter(u => u.id !=id)
}