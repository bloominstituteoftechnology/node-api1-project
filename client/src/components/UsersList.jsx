import React, { useState } from "react";
import axios from "axios";
import User from "./User";

const UsersList = () => {
	const [usersList, setUsersList] = useState([]);

	const fetchUsers = () => {
		axios
			.get("http://localhost:4000/api/users")
			.then(res => {
				console.log(res);
				setUsersList(res.data);
			})
			.catch(err => console.log(err));
	};

	const deleteUser = id => {
		axios
			.delete(`http://localhost:4000/api/users/${id}`)
			.then(res => {
				console.log("DELETING", res);
				setUsersList(usersList.filter(user => user.id !== id));
				console.log(`User with ID ${id} has been deleted`);
			})
			.catch(err =>
				console.log(`Error trying to delete user with ID ${id}`, err)
			);
	};

	return (
		<>
			<button onClick={fetchUsers}>Fetch Users</button>
			<User users={usersList} deleteUser={deleteUser} />
		</>
	);
};

export default UsersList;
