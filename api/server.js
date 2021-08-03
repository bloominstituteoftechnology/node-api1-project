// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const User = require("./users/model");

server.use(express.json());

server.post("/api/users", (req, res) => {
	const { name, bio } = req.body;

	if (name === "" || bio === "") {
		res
			.status(400)
			.json({ message: "Please provide name and bio for the user" });
	} else {
		User.insert({ name, bio })
			.then((user) => {
				res.status(201).json(user);
			})
			.catch(() =>
				res.status(500).json({
					message: "There was an error while saving the user to the database",
				})
			);
	}
});
server.get("/api/users", (req, res) => {
	User.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: "The users information could not be retrieved" });
		});
});
server.get("/api/users/:id", (req, res) => {
	const { id } = req.params;

	User.findById(id)
		.then((user) => {
			if (!user) {
				res.status(404).json({ message: `The user ${id} does not exist` });
			} else {
				res.status(200).json(user);
			}
		})
		.catch(() => {
			res.status(500).json({ message: "The user could not be removed" });
		});
});
server.put("/api/users/:id", (req, res) => {
	const { id } = req.params;
	const { name, bio } = req.body;

	if (name === "" || bio === "") {
		res
			.status(400)
			.json({ message: "Please provide name and bio for the user" });
	} else {
		User.update(id, { name, bio })
			.then((updatedUser) => {
				if (!updatedUser) {
					res.status(404).json({ message: `The user ${id} does not exist` });
				} else {
					res.status(200).json(updatedUser); // defaults to status 200
				}
			})
			.catch(() => {
				res
					.status(500)
					.json({ message: "The user information could not be modified" });
			});
	}
});
server.delete("/api/users/:id", (req, res) => {
	const { id } = req.params;
	User.remove(id)
		.then((deleted) => {
			if (!deleted) {
				res.status(404).json({ message: "USER DELETED" });
			} else {
				res.json(deleted);
			}
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});
module.exports = server; // EXPORT YOUR SERVER instead of {}
