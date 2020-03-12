import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Input } from "antd";

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
		<div className='add__user__form__container'>
			<Form onSubmit={handleSubmit} className='add__user__form'>
				<Input
					type='text'
					name='name'
					value={newUser.name}
					placeholder='name'
					onChange={handleChange}
				/>
				<Input
					type='text'
					name='bio'
					value={newUser.bio}
					placeholder='bio'
					onChange={handleChange}
				/>
				<Button>Add User</Button>
			</Form>
		</div>
	);
};

export default AddUser;
