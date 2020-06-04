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
    
      if(user) {
        return user
      } else {
        return false
      }
}

//tester GET request
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
// Functions for our CRUD App

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
  if (req.body.name === false || req.body.bio === false) {
    return res.status(400).json({
      message: "Please include a name and bio.",
    });
  }

  const newUser = createUser(req.body);

  res.status(201).json(newUser);
});

// Delete Request
server.delete("/api/users/:id", (req, res) => {
  const userId = getUserById(req.params.id)


  function testUser(id) {
    const user = users.find((user) => {
        return user.id === String(id);
      });
    
      if(user) {
        return users
      } else {
        return false
      }
}
  let testForUser = (testUser(userId))

  if(!testForUser) {
      return res.status(404).json({
        errorMessage: "The users information could not be retrieved." 
      })
  } else {
    testForUser = usersForUser.filter((user) => {
        return user.id !== Number(id);
      });
  }
  
  res.status(200).json(users);
});

// PUT request

function updateUser(id, data) {
    const index = users.findIndex(user => {
        return user.id === id
    })
    users[index] = {
        ...users[index],
        ...data
    }

    return users[index]
}

server.put("/api/users/:id", (req, res) => {
    const user = getUserById(req.params.id)

    if(user) {
        const updatedUser = updateUser(user.id, {
            name: req.body.name || user.name
        })
        res.json(updatedUser)
    } else {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved.",
          })
    }
})

//listen to server traffic
const port = 8000;
server.listen(port, () => console.log("\n === Sever 8000 === \n"));
