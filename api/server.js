// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model");
const server = express();
server.use(express.json());

server.get("/api/users", (req, res) => {
	Users.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			res.status(500).json({
				message: "The users information could not be retrieved",
				error: err,
			});
		});
});

server.post("/api/users", (req, res) => {
	const { name, bio } = req.body;

	if (!name || !bio) {
		res.status(400).json({
			message: "Please provide name and bio for the user",
		});
	} else {
		Users.insert({ name, bio })
			.then((newUser) => {
				res.status(201).json(newUser);
			})
			.catch((err) => {
				res.status(500).json({ message: err.message });
			});
	}
});

server.get("/api/users/:id", (req, res) => {
	const id = req.params.id;
	Users.findById(id)
		.then((user) => {
			if (user) {
				res.status(200).json(user);
			} else {
				res
					.status(404)
					.json({ message: "The user with the specified ID does not exist" });
			}
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
				message: "The user information could not be retrieved",
			});
		});
});

server.delete("/api/users/:id", (req, res) => {
	const id = req.params.id;
	Users.remove(id)
		.then((user) => {
			if (user) res.status(200).json(user);
			else
				res
					.status(404)
					.json({ message: "The user with the specified ID does not exist" });
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
				message: "The user could not be removed",
			});
		});
});

server.put("/api/users/:id", (req, res) => {
	const id = req.params.id;
	const { name, bio } = req.body;
	if (name && bio) {
		Users.update(id, req.body)
			.then((user) => {
				if (user) res.status(200).json(user);
				else
					res
						.status(404)
						.json({ message: "The user with the specified ID does not exist" });
			})
			.catch((err) => {
				res.status(500).json({ message: err.message });
			});
	} else {
		res
			.status(400)
			.json({ message: "Please provide name and bio for the user" });
	}
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
