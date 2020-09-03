const express = require('express');
const shortid = require('shortid');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const port = 8000;

let users = [
	{
		id: shortid.generate(),
		name: 'Jane Doe',
		bio: "Not Tarzan's Wife, another Jane",
	},
	{
		id: shortid.generate(),
		name: 'John Doe',
		bio: 'A Stiff Guy',
	},
	{
		id: shortid.generate(),
		name: 'Billy Bob',
		bio: "Banjos playing 'Deliverance' Theme",
	},
];

const updateUser = (user) => {
	users = users.map((u) => {
		if (user.id === u.id) {
			return {
				id: user.id,
				name: user.name,
				bio: user.bio,
			};
		} else {
			return u;
		}
	});
};

const deleteUser = (id) => {
	users = users.filter((user) => user.id !== id);
};

app.get('/api/users', (req, res) => {
	if (!users) {
		res
			.status(500)
			.json({ errorMessage: 'The users information could not be retrieved.' });
	} else {
		res.status(200).json(users);
	}
});

app.get('/api/users/:id', (req, res) => {
	const { id } = req.params;
	const user = users.filter((user) => id === user.id);
	if (!users) {
		res
			.status(500)
			.json({ errorMessage: 'The user information could not be retrieved.' });
	} else if (!user) {
		res
			.status(404)
			.json({ message: 'The user with the specified ID does not exist.' });
	} else {
		res.status(200).json(user);
	}
});

app.post('/api/users', (req, res) => {
	const body = req.body;
	if (!body.name || !body.bio) {
		res
			.status(400)
			.json({ errorMessage: 'Please provide name and bio for the user.' });
	} else {
		const newUser = {
			id: shortid.generate(),
			name: req.body.name,
			bio: req.body.bio,
		};
		users.push(newUser);
		res.status(200).json(newUser);
	}
});

app.put('/api/users/:id', (req, res) => {
	const { id } = req.params;
	const user = req.body;
	user.id = id;

	const index = users.findIndex((u) => u.id === id);
	if (index === -1) {
		res
			.status(404)
			.json({ message: 'The user with the specified ID does not exist.' });
	} else if (!users) {
		res
			.status(500)
			.json({ errorMessage: 'The user information could not be modified.' });
	} else if (!user.name || !user.bio) {
		res
			.status(400)
			.json({ errorMessage: 'Please provide name and bio for the user.' });
	} else {
		updateUser(user);
		res.status(200).json(users[index]);
	}
});

app.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;
	const deleted = users.find((user) => user.id === id);
	if (!deleted) {
		res
			.status(404)
			.json({ message: 'The user with the specified ID does not exist.' });
	} else if (!users) {
		res.status(500).json({ errorMessage: 'The user could not be removed' });
	} else {
		deleteUser(id);
		res.status(200).json(deleted);
	}
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
