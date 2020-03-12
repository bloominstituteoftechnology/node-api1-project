import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ users, setUsers }) => {
	const [newUser, setNewUser] = useState({
		name: "",
		bio: ""
	});

	const handleChange = e => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.post("http://localhost:4000/api/users", newUser)
			.then(res => {
				setUsers([...users, res.data]);
				console.log(res);
			})
			.catch(err => console.log(err))
			.finally(
				setNewUser({
					name: "",
					bio: ""
				})
			);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='name'
					value={newUser.name}
					placeholder='name'
					onChange={handleChange}
				/>
				<input
					type='text'
					name='bio'
					value={newUser.bio}
					placeholder='bio'
					onChange={handleChange}
				/>
				<button>Add User</button>
			</form>
		</>
	);
};

export default AddUser;
