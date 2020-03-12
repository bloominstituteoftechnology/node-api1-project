import React, { useState } from "react";
import axios from "axios";

const UsersList = () => {
	const [usersList, setUsersList] = useState([]);

	const fetchUsers = () => {
		axios
			.get("http://localhost:4000/api/users")
			.then(res => setUsersList(...usersList, res.data))
			.catch(err => console.log(err));
	};

	const user = usersList.map(user => {
		return (
			<div key={user.id}>
				<h2>{user.name}</h2>
				<p>{user.bio}</p>
			</div>
		);
	});

	return (
		<>
			<button onClick={fetchUsers}>Fetch Users</button>
			{user}
		</>
	);
};

export default UsersList;
