const express = require("express");

const shortid = require("shortid");
const server = express();

const users = [
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

server.listen("4000", () => {
	console.log("Listening on port 4000");
});

server.use(express.json());

server.get("/", (req, res) => {
	res.send("Hello Daniel");
});

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
	const user = users.find(user => user.id === req.params.id);
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

	//If there's an error in retrieving the users we'll send back the message below
	else {
		res
			.status(500)
			.json({ errorMessage: "The users information could not be retrieved." });
	}
});
