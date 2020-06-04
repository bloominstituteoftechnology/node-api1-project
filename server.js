// This import is pulling from node_modules now
const express = require("express");
const db = require("./database.js");

const server = express();

server.use(express.json());

//--GET--
server.get("/users", (req, res) => {
	const users = db.getUsers();
	if (users) {
		res.json(users);
	} else {
		res.status(500).json({
			errorMessage: "The users information could not be retrieved.",
		});
	}
});

server.get("/users/:id", (req, res) => {
	const user = db.getUserById(userId);
	const userId = req.params.id;

	if (user) {
		res.json(user);
	} else if (!user) {
		res.status(404).json({
			message: "The user with the specified ID does not exist.",
		});
	} else {
		res.status(500).json({
			errorMessage: "The user information could not be retrieved.",
		});
	}
});

// --POST--Create--
server.post("/users", (req, res) => {
	//validate user
	if (!req.body.name || !req.body.bio) {
		return res.status(400).json({
			errorMessage: "Please provide name and bio for the user.",
		});
	}

	const newUser = db.createUser({
		name: req.body.name,
		bio: req.body.bio,
	});

	if (newUser) {
		res.status(201).json(newUser);
	} else {
		res.status(500).json({
			errorMessage: "The users information could not be retrieved.",
		});
	}
});

//--PUT--
server.put("/users/:id", (req, res) => {
	//validate user
	if (!req.body.name || !req.body.bio) {
		return res.status(400).json({
			errorMessage: "Please provide name and bio for the user.",
		});
	}
	const user = db.getUserById(req.params.id);
	if (user) {
		const updatedUser = db.updateUser(req.params.id, {
			name: req.body.name || user.name,
			bio: req.body.bio || user.bio,
		});
		res.status(201).json(updatedUser);
	} else if (!user) {
		res.status(404).json({
			message: "The user with the specified ID does not exist.",
		});
	} else {
		res.status(500).json({
			errorMessage: "The user information could not be modified.",
		});
	}
});

//--DELETE--
server.delete("/users/:id", (req, res) => {
	const user = db.getUserById(req.params.id);

	if (user) {
		db.deleteUser(user.id);
		res.status(204).end();
	} else if (!user) {
		res.status(404).json({
			message: "The user with the specified ID does not exist.",
		});
	} else {
		res.status(500).json({
			errorMessage: "The user could not be removed",
		});
	}
});

server.listen(8000, () => {
	console.log("server started port 8000");
});
