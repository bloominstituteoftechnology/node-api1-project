import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Input } from "antd";

const EditUser = ({ users, setUsers, userToEdit }) => {
	const [updatedUser, setUpdatedUser] = useState({
		name: "",
		bio: ""
	});
	console.log(userToEdit);
	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/users/${userToEdit?.id}`)
			.then(res => {
				console.log(res);
				setUpdatedUser({
					name: res.data.name,
					bio: res.data.bio
				});
			})
			.catch(err => console.log(err));
	}, [userToEdit.id]);

	const handleChange = e => {
		setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.put(`http://localhost:4000/api/users/${userToEdit?.id}`, updatedUser)
			.then(res => {
				setUsers(
					users.map(user =>
						user.id === userToEdit.id ? { ...user, ...res.data } : user
					)
				);
			})
			.catch(err => console.log(err))
			.finally(
				setUpdatedUser({
					name: "",
					bio: ""
				})
			);
	};

	return (
		<>
			{userToEdit.id ? (
				<Form onSubmit={handleSubmit}>
					<Input
						type='text'
						name='name'
						value={updatedUser.name}
						placeholder='name'
						onChange={handleChange}
					/>
					<Input
						type='text'
						name='bio'
						value={updatedUser.bio}
						placeholder='bio'
						onChange={handleChange}
					/>
					<Button>Save Changes</Button>
				</Form>
			) : null}
		</>
	);
};

export default EditUser;
