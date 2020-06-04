const express = require("express");
const server = express();

server.use(express.json());

//database
let users = [
  {
    id: "1",
    name: "Ariel Rodriguez",
    bio: "Papa, Developer, Tinkerer",
  },
  {
    id: "2",
    name: "Lauren Chil",
    bio: "Mama, Boss_B, Leader",
  },
  {
    id: "3",
    name: "Ellie Arielle",
    bio: "Three-nager",
  },
];
function getUserById(id) {
  const user = users.find((user) => {
    return user.id === String(id);
  });

  if (user) {
    return user;
  } else {
    return false;
  }
}
//************************************************************************* */
//GET USERS
server.get("/api/users", (req, res) => {
  const user = req.body;

  if (user) {
    res.status(200).json(users);
  } else {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved.",
    });
  }
});
//************************************************************************* */

// GET users by ID
server.get("/api/users/:id", (req, res) => {
  const user = getUserById(req.params.id);

  if (user) {
    res.json(user);
  } else if (user === false) {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved.",
    });
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  }
});

//************************************************************************* */

//POST Request
function createUser(data) {
  const payload = {
    id: String(users.length + 1),
    ...data,
  };
  users.push(payload);
  return payload;
}

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({
      message: "Please include a name and bio.",
    });
  }

  const newUser = createUser({
    name: req.body.name,
    bio: req.body.bio,
  });
  res.status(201).json(newUser);
});
//************************************************************************* */

// Delete Request
server.delete("/api/users/:id", (req, res) => {

  const userId = getUserById(req.params.id);

  function deletedUser(id) {
      users = users.filter(user => {
          return user.id !== id
      })
  }

  if (userId) {
      deletedUser(userId.id)
      res.status(200).json({
          message:`${userId.name} has been deleted`
      })
  } else {
      res.status(404).json({
          message: "User does not exist"
      })
  }
});
//************************************************************************* */

// PUT Request
function updateUser(id, data) {
    const index = users.findIndex(u => u.id === id)
    users[index] = {
        ...users[index],
        ...data,
    }
    return users[index]
  }

  server.put("/api/users/:id", (req, res) => {
    const user = getUserById(req.params.id);
  
    if(user) {
        const updatedUser = updateUser(user.id, {
            name: req.body.name || user.name,
            // bio: req.body.bio || user.bio
        })
        res.json(updatedUser)
    } else {
        res.status(404).json({
            message: "User not Found"
        })
    }
  });

//listen to server traffic
const port = 8000;
server.listen(port, () => console.log("\n === Sever 8000 === \n"));
