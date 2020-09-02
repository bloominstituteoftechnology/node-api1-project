const express = require('express');
const shortid = require('shortid');

const app = express();
app.use(express.json());
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

const updateUser = (id, req) => {
	users = users.map((user) => {
		if (id === user.id) {
			return {
				id: user.id,
				name: req.body.name,
				bio: req.body.bio,
			};
		} else {
			return user;
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
	if (!req.body.name || !req.body.bio) {
		res
			.status(400)
			.json({ errorMessage: 'Please provide name and bio for the user.' });
	} else {
		users.push({
			id: shortid.generate(),
			name: req.body.name,
			bio: req.body.bio,
		});
		res.status(200).json(users);
	}
});

app.put('/api/users/:id', (req, res) => {
	const { id } = req.params;
	if (!users.some((u) => u.id !== id)) {
		res
			.status(404)
			.json({ message: 'The user with the specified ID does not exist.' });
	} else if (!users) {
		res
			.status(500)
			.json({ errorMessage: 'The user information could not be modified.' });
	} else if (!req.body.name || !req.body.bio) {
		res
			.status(400)
			.json({ errorMessage: 'Please provide name and bio for the user.' });
	} else {
		updateUser(id, req);
		res.status(200).json(users);
	}
});

app.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;

	if (!users.some((u) => u.id !== id)) {
		res
			.status(404)
			.json({ message: 'The user with the specified ID does not exist.' });
	} else if (!users) {
		res.status(500).json({ errorMessage: 'The user could not be removed' });
	} else {
		deleteUser(id);
		res.status(200).json(users);
	}
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
