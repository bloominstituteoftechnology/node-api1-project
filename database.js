const shortid = require('shortid');

module.exports ={
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};

let users = [
    {
        id: "a_unique_id",
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane"
    }
]

function getUsers(){
    return users;
}

function getUserById(id){
    return users.find(u => u.id === id);
};

function createUser(data){
    const payload = {
        id:  shortid.generate(),
        ...data  
    }
    users.push(payload);
    return payload;
};
function updateUser(id, data){
    const index = users.findIndex(u => u.id === id);
    users[index] = {
        ...users[index],
        ...data,
    }
    return res.json(users[index]);
}

function deleteUser(id){
    users = users.filter(u => u.id != id);
};

