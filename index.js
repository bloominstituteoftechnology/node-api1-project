// implement your API here

const express = require("express");

const user = require("./data/db.js");

const port = 5000;
const host = "127.0.0.1"; //localhost
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Working!" });
});

// Write endpoints to perform the following queries
// Inside index.js add the code necessary to implement the following endpoints:

// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.  

app.post("/api/users", (req, res) => {
    const newUser = {
      name: req.body.name,
      bio: req.body.bio
    };
  
    if (!req.body.name || !req.body.bio) {
      return res
      // - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    }
  
    user
      .insert(newUser)
      .then(user => {
// - save the new _user_ the the database.
//   - respond with HTTP status code `201` (Created).
//   - return the newly created _user document_.
        if (req.body.name && req.body.bio) {
          return res.status(201).json("Created");
        }
      })
      .catch(error => {
        // - respond with HTTP status code `500` (Server Error).
        // - return the following JSON object: `{ errorMessage: "There was an error while saving the user to the database" }`.
        res.status(500).json({
          errorMessage: "There was an error while saving the user to the database"
        });
      });
  });

// | GET    | /api/users     | Returns an array of all the user objects contained in the database.     

app.get("/api/users", (req, res) => {
  user
    .find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
    //     - respond with HTTP status code `500`.
    //     - return the following JSON object: `{ errorMessage: "The users information could not be retrieved." }`.
    //   res.status(500).json({ error: "The users information could not be retrieved." });
    });
});

//| GET    | /api/users/:id | Returns the user object with the specified `id`.    

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  user
    .findById(id)
    .then(userId => {
      if (!userId) {
        res
        // - respond with HTTP status code `404` (Not Found).
        // - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        return res.status(200).send(userId);
      }
    })
    .catch(error => {
      res
      //  - respond with HTTP status code `500`.
//   - return the following JSON object: `{ errorMessage: "The user information could not be retrieved." }`.
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved" });
    });
});


// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.   

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  user.findById(id).then(userId => {
    if (!userId) {
      res
      //- respond with HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.
        .status(404).json({ message: "The user with the specified ID does not exist." });
    }
  });
  user
    .remove(id)
    .then(userId => {
      if (userId) {
        res.status(200).send(`${userId} deleted`);
      }
    })
    .catch(error => {
        // - respond with HTTP status code `500`.
//   - return the following JSON object: `{ errorMessage: "The user could not be removed" }`.
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. |
app.put('/api/user/:id', (req, res)=>{
    const {name, bio} = req.body;
    const id = req.params.id;

    if(!id){
        //   - respond with HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.
res.status(404).json({ message: "The user with the specified ID does not exist." })
    }else if(!name || !bio){
        // - respond with HTTP status code `400` (Bad Request).
        // - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.
        res.status(400).json({ message: "Please provide name and bio for the user." })
    } else{
        db.update(id, { name, bio })
            .then(response => {
                console.log(response)
                res.status(201).json({message: 'Update Successful', newUser: {name, bio}})
            })
            .catch(err => {
                console.log(err)
                //   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ errorMessage: "The user information could not be modified." }`.
                res.status(500).json({ errorMessage: "The user information could not be modified." })

            })
    }

});


// - If the user is found and the new information is valid:

//   - update the user document in the database using the new information sent in the `request body`.
//   - respond with HTTP status code `200` (OK).
//   - return the newly updated _user document_.

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
  });