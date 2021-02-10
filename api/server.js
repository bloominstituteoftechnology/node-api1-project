// BUILD YOUR SERVER HERE
const express = require("express");
const db = require("./users/model.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
	res.json({ message: "Successfully spun up." });
});

server.get("/users", (req, res) => {
	const users = db.find();
	if (!users) {
		res.status(500).json("The users information could not be retrieved");
	} else {
		res.json(users);
	}
});

server.get("/users/:id", (req, res) => {
	const user = db.findById(req.params.id);

	if (user === undefined) {
		res
			.status(404)
			.json({ message: "The user with the specified ID does not exist" });
	} else if (user !== undefined && !user) {
		res
			.status(500)
			.json({ message: "The user information could not be retrieved" });
	} else {
		res.json(user);
	}
});

server.post("/users", (req, res) => {
	const newUser = db.insert({
		name: req.body.name,
		bio: req.body.bio,
	});

	if (newUser.name === "" || newUser.bio === "") {
		res
			.status(400)
			.json({ message: "Please provide name and bio for the user." });
	} else if (newUser.name !== "" || newUser.bio !== "") {
		res.status(201).json(newUser);
	} else {
		res.status(500).json({
			message: "There was an error while saving the user to the database",
		});
	}
});

server.put("/users/:id", (req, res) => {
	const user = db.findById(req.params.id);

	if (user.id === undefined) {
		res
			.status(404)
			.json({ message: "The user with the specified ID does not exist" });
	} else if (user.name === "" || user.bio === "") {
		res
			.status(400)
			.json({ message: "Please provide name and bio for the user" });
	} else if (!user) {
		res
			.status(500)
			.json({ message: "The user information could not be modified" });
	} else {
		db.update(user.id, {
			name: req.body.name,
			bio: req.body.bio,
		});
		res.status(200).json(user);
	}
});

server.delete("users/:id", (req, res) => {
	const user = db.findById(req.params.id);

	if (user) {
		db.remove(user.id);
	} else if (user === undefined) {
		res
			.status(404)
			.json({ message: "The user with the specified ID does not exist" });
	} else {
		res.status(500).json({ message: "The user could not be removed" });
	}
});

// EXPORT YOUR SERVER instead of {}
module.exports = server;
