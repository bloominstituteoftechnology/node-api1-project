const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());


const users = [
    {
        id: 1,
        name: 'Binx',
        bio: 'Cutest little weenie dog'
    },
    {
        id: 2,
        name: 'Fubbins',
        bio: 'Vicious attack cat'
    },
    {
        id: 3,
        name: 'MaoMao',
        bio: 'Killer of cute animals'
    }
];


app.get('/', (req, res) => {
    res.send('Hello');
})


/* Returns an array users. */
app.get('/api/users/', (req, res) => {
    res.send(users);
})

/* DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.

/* Returns the user object with the specified id. */
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) res.status(404).send('The user with the given id was not found')
    res.send(user);
});


/* Creates a user using the information sent inside the request body. */
app.post('/api/users/', (req, res) => {
    const { error } = validateUser(req.body); //result.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const user = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(user);
    res.send(user);
});



/* PUT / api / users /: id	Updates the user with the specified id using data from the request body.Returns the modified user  */
app.put('/api/ users /:id', (req, res) => {
    /* Look up the user
    if they don't exist, return 404*/
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) res.status(404).send('The user with the given id was not found')
    
    /* validate, if invalid , return 400 - bad request */
    const schema = {
        name: Joi.string().min(3).required()
    };

    const { error } = validateUser(req.body); //result.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    /*  update user*/
    user.name = req.body.name;

    res.send(user);

});

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(user, schema);
}

//PORT on term export PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`))

