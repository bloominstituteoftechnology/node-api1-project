import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Input, Modal } from "antd";

const EditUser = ({ users, setUsers, userToEdit }) => {
	const [updatedUser, setUpdatedUser] = useState({
		name: "",
		bio: ""
	});

	const [visible, setVisible] = useState(false);

	const showModal = () => {
		setVisible(true);
	};

	const handleCancel = e => {
		console.log(e);
		setVisible(false);
	};

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
		showModal();
	}, [userToEdit.id]);

	const handleChange = e => {
		setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		setVisible(false);
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
				<>
					<Modal
						title='Basic Modal'
						visible={visible}
						onOk={handleSubmit}
						onCancel={handleCancel}
					>
						<Form onSubmit={handleSubmit} className='edit__user__form'>
							<label>Name</label>
							<Input
								type='text'
								name='name'
								value={updatedUser.name}
								placeholder='name'
								onChange={handleChange}
							/>
							<label>Bio</label>
							<Input
								type='text'
								name='bio'
								value={updatedUser.bio}
								placeholder='bio'
								onChange={handleChange}
							/>
						</Form>
					</Modal>
				</>
			) : null}
		</>
	);
};

export default EditUser;
