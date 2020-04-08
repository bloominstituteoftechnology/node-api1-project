const express = require("express");
const cors = require("cors");
const path = require("path");

const shortid = require("shortid");
const server = express();

let users = [
	{
		id: shortid.generate(),
		name: "Lucas Borden",
		bio: "I am an adventurer"
	},
	{
		id: shortid.generate(),
		name: "Raj Mohamed",
		bio: "I am a singer"
	},
	{
		id: shortid.generate(),
		name: "Alex Brice",
		bio: "I am a footballer"
	},
	{
		id: shortid.generate(),
		name: "Jimmy Hoper",
		bio: "I am a software developer"
	}
];

server.use(express.json());
server.use(cors());
server.use(express.static(path.join(__dirname, "/client/build")));

// server.get("/", (req, res) => {
// 	res.send("Hello Daniel");
// });

// C - Create (CRUD)
server.post("/api/users", (req, res) => {
	const user = req.body;
	user.id = shortid.generate();

	// If the request body is missing the name or bio property we'll send an error back asking for those
	if (!user.name || !user.bio) {
		res
			.status(400)
			.json({ errorMessage: "Please provide name and bio for the user." });
	}

	// If the information about the user is valid we'll save the user it to the users array
	else if (user.name && user.bio) {
		users.push(user);
		res.status(201).json(user);
	}

	// If there's an error while saving the user we'll send back the message below
	else {
		res.status(500).json({
			errorMessage: "There was an error while saving the user."
		});
	}
});

// R - Read (CRUD)
server.get("/api/users", (req, res) => {
	//If we have users we'll send the requested data back
	if (users) {
		res.status(200).json(users);
	}

	//If there's an error in retrieving the users we'll send back the message below
	else {
		res
			.status(500)
			.json({ errorMessage: "The users information could not be retrieved." });
	}
});

// R - Read(id) (CRUD)
server.get("/api/users/:id", (req, res) => {
	const { id } = req.params;
	const user = users.find(user => user.id === id);
	//If we have the specified user we'll send it back
	if (user) {
		res.status(200).json(user);
	}

	// If we don't have the specified user we'll send back the message below
	else if (!user) {
		res
			.status(404)
			.json({ message: "The user with the specified ID does not exist." });
	}

	//If there's an error in retrieving the specified user we'll send back the message below
	else {
		res
			.status(500)
			.json({ errorMessage: "The user information could not be retrieved." });
	}
});

// D - Delete (CRUD)
server.delete("/api/users/:id", (req, res) => {
	const { id } = req.params;
	const deleted = users.find(user => user.id === id);

	//If we have the specified user we'll remove it from the users array
	if (deleted) {
		users = users.filter(user => user.id !== id);
		res.status(200).end();
	}

	// If we don't have the specified user we'll send back the message below
	else if (!deleted) {
		res
			.status(404)
			.json({ message: "The user with the specified ID does not exist." });
	}

	//If there's an error in removing the specified user we'll send back the message below
	else {
		res.status(500).json({ errorMessage: "The user could not be removed." });
	}
});

// U - Update (CRUD)
server.patch("/api/users/:id", (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	let user = users.find(user => user.id === id);

	// If the request body is missing the name or bio property we'll send an error back asking for those
	if (!changes.name || !changes.bio) {
		res
			.status(400)
			.json({ errorMessage: "Please provide name and bio for the user." });
	}

	// If we don't have the specified user we'll send back the message below
	else if (!user) {
		res
			.status(404)
			.json({ message: "The user with the specified ID does not exist." });
	}

	//If the user is found and the new information is valid we'll update the user and send it back
	else if (user) {
		Object.assign(user, changes);
		res.status(200).json(user);
	}

	//If there's an error when updating the specified user we'll send back the message below
	else {
		res
			.status(500)
			.json({ errorMessage: "The user information could not be modified." });
	}
});

// U - Update (CRUD)
server.put("/api/users/:id", (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	let index = users.findIndex(user => user.id === id);

	// If the request body is missing the name or bio property we'll send an error back asking for those
	if (!changes.name || !changes.bio) {
		res
			.status(400)
			.json({ errorMessage: "Please provide name and bio for the user." });
	}

	// If we don't have the specified user we'll send back the message below
	else if (index === -1) {
		res
			.status(404)
			.json({ message: "The user with the specified ID does not exist." });
	}

	//If the user is found and the new information is valid we'll update the user and send it back
	else if (index !== -1) {
		users[index] = changes;
		res.status(200).json(users[index]);
	}

	//If there's an error when updating the specified user we'll send back the message below
	else {
		res
			.status(500)
			.json({ errorMessage: "The user information could not be modified." });
	}
});

server.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const PORT = 5000;
server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
