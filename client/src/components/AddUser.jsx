import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Input, message } from "antd";

const AddUser = ({ users, setUsers }) => {
	const [newUser, setNewUser] = useState({
		name: "",
		bio: ""
	});

	const handleChange = e => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
	};

	const info = () => {
		message.info(`New user added`);
	};

	const handleSubmit = () => {
		axios
			.post("http://localhost:4000/api/users", newUser)
			.then(res => {
				setUsers([...users, res.data]);
				// console.log("res", res);
				info();
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
			<Form onFinish={handleSubmit} className='add__user__form'>
				<Input
					name='name'
					value={newUser.name}
					placeholder='name'
					onChange={handleChange}
					allowClear
				/>

				<Input
					name='bio'
					value={newUser.bio}
					placeholder='bio'
					onChange={handleChange}
					allowClear
				/>

				<Button htmlType='submit'> Add User</Button>
			</Form>
		</div>
	);
};

export default AddUser;
