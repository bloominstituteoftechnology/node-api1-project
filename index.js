// console.log("Hello from Node.js...");
// C for Create: HTTP POST
// R for Read: HTTP GET
// U for Update: HTTP PUT
// D for Delete: HTTP DELETE

const express = require("express");
const app = express(); // or use server
app.use(express.json());

const port = 3001;
// const bodyParser = require("body-parser");
// const { v4 } = require("uuid");

// const users = [
//   { id: 1, name: "person1", bio: "Kinda Interesting" },
//   { id: 2, name: "person2", bio: "Very Interesting" },
//   { id: 3, name: "person3", bio: "Super duper interesting" },
// ];
const users = require("./data.js");
// //--------------------------------------------------------------------------
//   Endpoint Specifications
app.get("/", (req, res) => {
  res.json({ Api: "Hello World. I am an API" });
});

// //--------------------------------------------------------------------------
// //                              GET REQUEST
// //--------------------------------------------------------------------------

// app.get('/api/users', (req, res) => {
//     Data.find()
//         .then(users => {
//             res.status(200).json({ succes: true, users });
//         }).catch(err => {
//             res.status(500).json({ success: false, errorMessage: 'Internal server error'})
//         })
// });
app.get("/api/users", (req, res) => {
  users
    .find()
    .then((users) => {
      res.status(200).json(users);
      //   res.send([1, 2, 3]);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "The users information could not be retrieved.",
        err,
      });
    });
});
//--------------------------------------------------------------------------
//                              POST REQUEST
//--------------------------------------------------------------------------

//  POST   /api/users     | Creates a user using the information sent inside the `request body`.                                   |
app.post("/", (req, res) => {
  const newUser = req.body;

  users
    .insert(newUser)
    .then((user) => {
      if (!newUser.name || !newUser.bio) {
        res
          .status(400)
          .json({ errorMessage: "please provide name or bio for the user" });
      } else {
        res
          .status(201)
          .json({ message: `user created, id: ${user.id}`, newUser });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "error adding data, please try again later",
        err,
      });
    });
});

//--------------------------------------------------------------------------
//                              GET REQUEST
//--------------------------------------------------------------------------

//  GET   /api/users     | Creates a user using the information sent inside the `request body`.
// app.get("/api/users", (req, res) => {
//   users
//     .find()
//     .then((users) => {
//       res.status(200).json(users);
//       //   res.send([1, 2, 3]);
//     })
//     .catch((err) => {
//       res.status(500).json({
//         errorMessage: "The users information could not be retrieved.",
//         err
//       });
//     });
// });

//  GET   /api/users/:id     | Returns the user object with the specified                                    |
app.get("/api/users/:id", (req, res) => {
  users
    .findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
        // res.send(req.params.id);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
  // res.send(req.query);
});

//  GET   /api/users     | Creates a user using the information sent inside the `request body`.                                   |
app.get("/api/users/:id/:name/:bio", (req, res) => {
  //input info on URL
  if (!res.body.text) {
    return res.status(400).json({ errorMessage: "Need a text value" });
  }
  users
    .addUserBio(req.params.id, req.body)
    .then((post) => {
      res.status(201).json(bio);
      res.send(req.params);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ errorMessage: "Could not get user bio" });
    });
});

//--------------------------------------------------------------------------
//                              DELETE REQUEST
//--------------------------------------------------------------------------

// DELETE  /api/users/:id  | Removes the user with the specified `id` and returns the deleted user.
app.delete("/api/posts/:id", (req, res) => {
  users
    .remove(req.params.id)
    // .findUserById()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ errorMessage: "User has been removed" });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

//--------------------------------------------------------------------------
//                              PUT REQUEST
//--------------------------------------------------------------------------
//  PUT    /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
app.put("/api/posts/:id", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  users
    .update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be modified." });
    });
});

// const port = 3000;
app.listen(port, () => {
  console.log(`Hello, I am on port ${port}`);
});

// // If there's an error while saving the _user_:
// // When the client makes a `GET` request to `/api/users`:
// // If there's an error in retrieving the _users_ from the database:
// // When the client makes a `GET` request to `/api/users/:id`:
// // If the _user_ with the specified `id` is not found:
// // If there's an error in retrieving the _user_ from the database:
// //  - respond with HTTP status code `400` (Bad Request)
//----------------------------------------------------------------------
// app.get("/api/users/:id", (req, res) => {
//     const user = users.find(c => c.id === parseInt(req.params.id));
//     if (!course)  res.status(400).send('The user with given ID was no found');
//     res.send(user);
// });
// app.get("/api/users", (req, res) => {
//     const user = {
//         id: "a_unique_id", // hint: use the shortid npm package to generate it
//         name: "Jane Doe", // String, required
//         bio: "Not Tarzan's Wife, another Jane",  // String, required
//   };
//   users.push(user);
//   res.send(user);
// )};
//--------------------------------------------------------------------------------
// // If the information about the _user_ is valid:
// app.post("/api/users", (req, res) => {
//     const schema = {
//         name: Joi.string().min(3).reqiured()
//     };
//     const result = Joi.validate(req.body, schema);
//     console.log(result);

//     if (!req.body.name || req.body.name.length < 3) {
//         // res.status(201).send('Name is required and should be minimum 3 characters');
//         res.status(201).send(result.error.details[0].message);
//         return;
//     }
//--------------------------------------------------------------------
// // When the client makes a `DELETE` request to `/api/users/:id`:
// app.delete('/api/courses/:id', (req, res) => {
//         // look up user
//         // not existing return 400
//         const user = users.find(c => c.id === parseInt(req.params.id));
//         if (!course)  res.status(400).send('The user with given ID was no found');

//         // delete
//         const index = users.indexOf(user);
//         users.splice(index, 1);

//         // return
//         res.send(user);
// });
// // If the _user_ with the specified `id` is not found:
// // If there's an error in removing the _user_ from the database:
//------------------------------------------------------------------------
// app.put('/api/users/:id', (req, res) => {
//     // look up user
//     //not existing return 400
//     const user = users.find(c => c.id === parseInt(req.params.id));
//     if (!course)  res.status(400).send('The user with given ID was no found');

//     const {error} = validateUser(req.body)
//     if (error) {
//         res.status(400).send(error.details[0].message);
//         return;
//     }

//     course.name = req.body.name;
//     res.send(course);
//     //validate
//     //bad request - 400 error
//     const schema = {
//         name: Joi.string().min(3).reqiured()
//     };
//     const result = Joi.validate(req.body, schema);
//     //update user
//     // return updated
// })

// //
// const port = process.env.PORT || 3000;
// app.listen(3000, () => console.log("Listening on port 3000.."));

// Now listening to requests on port 3000
// {
//     id: "a_unique_id", // hint: use the shortid npm package to generate it
//     name: "Jane Doe", // String, required
//     bio: "Not Tarzan's Wife, another Jane",  // String, required
//   }
