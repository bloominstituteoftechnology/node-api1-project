// console.log("Hello from Node.js...");


const express = require("express");
const app = express();
app.use(express.json());

const users = [
    {id: 1, name: 'course1'}
    {id: 2, name: 'course2'}
    {id: 3, name: 'course3'}
];
//      endpoints
app.get("/", (req, res) => {
    res.json({api: "Hello World"});
  });
app.get('/api/users', (req, res) => {
    Data.find()
        .then(users => {
            res.status(200).json({ succes: true, users });
        })
});





//  POST   /api/users     | Creates a user using the information sent inside the `request body`.                                   |
app.post("/", (req, res) => {
  const newUser = req.body;

  Data.insert(newUser)
    .then(user => {
        if(!newUser.name  !newUser.bio)
    })
});

//  GET   /api/users     | Creates a user using the information sent inside the `request body`.                                   |
app.get("/api/users", (req, res) => {
  res.send([1, 2, 3]);
});

//  GET   /api/users/:id     | Returns the user object with the specified                                    |
app.get("/api/users/:id", (req, res) => {
    res.send(req.params.id);
    // res.send(req.query);
});    

//  GET   /api/users     | Creates a user using the information sent inside the `request body`.                                   |
app.get("/api/posts/:id/:name/:bio", (req, res) => {        //input info on URL
    res.send(req.params);
});    

// DELETE  /api/users/:id  | Removes the user with the specified `id` and returns the deleted user.   
app.delete();

//  PUT    /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
app.put();





app.get("/api/users", (req, res) => {
    const user = {
        id: "a_unique_id", // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
  };
  users.push(user);
  res.send(user);
)};


//  - respond with HTTP status code `400` (Bad Request)
app.get("/api/users/:id", (req, res) => {      
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!course)  res.status(400).send('The user with given ID was no found');
    res.send(user);
});    

// - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.


// If the information about the _user_ is valid:
app.post("/api/users", (req, res) => {      
    const schema = {
        name: Joi.string().min(3).reqiured()
    };
    const result = Joi.validate(req.body, schema);
    console.log(result);

    if (!req.body.name || req.body.name.length < 3) {
        // res.status(201).send('Name is required and should be minimum 3 characters');
        res.status(201).send(result.error.details[0].message);

        return;
    }
    const user = 



// If there's an error while saving the _user_:


// When the client makes a `GET` request to `/api/users`:


// If there's an error in retrieving the _users_ from the database:




// When the client makes a `GET` request to `/api/users/:id`:




// If the _user_ with the specified `id` is not found:




// If there's an error in retrieving the _user_ from the database:

// When the client makes a `DELETE` request to `/api/users/:id`:
app.delete('/api/courses/:id', (req, res) => {
        // look up user
        // not existing return 400
        const user = users.find(c => c.id === parseInt(req.params.id));
        if (!course)  res.status(400).send('The user with given ID was no found');
    
        // delete
        const index = users.indexOf(user);
        users.splice(index, 1);

        // return
        res.send(user);
});
// If the _user_ with the specified `id` is not found:


// If there's an error in removing the _user_ from the database:

//         When the client makes a `PUT` request to `/api/users/:id`:

// If the _user_ with the specified `id` is not found:


// If the request body is missing the `name` or `bio` property:


// If there's an error when updating the _user_:


// If the user is found and the new information is valid:

// Update the user document in the database using the new information sent in the `request body`.

app.put('/api/users/:id', (req, res) => {
    // look up user
    //not existing return 400
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!course)  res.status(400).send('The user with given ID was no found');


    const {error} = validateUser(req.body)
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
    //validate
    //bad request - 400 error
    const schema = {
        name: Joi.string().min(3).reqiured()
    };
    const result = Joi.validate(req.body, schema);
    //update user
    // return updated




})












//
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log("Listening on port 3000.."));


Now listening to requests on port 3000
{
    id: "a_unique_id", // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane",  // String, required
  }