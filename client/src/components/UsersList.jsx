import React, { useState } from "react";
import axios from "axios";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import User from "./User";
import { Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const UsersList = () => {
	const [usersList, setUsersList] = useState([]);
	const [userToEdit, setUserToEdit] = useState({});

	const fetchUsers = () => {
		axios
			.get("/api/users")
			.then(res => {
				console.log(res);
				setUsersList(res.data);
			})
			.catch(err => console.log(err));
	};

	const deleteUser = id => {
		const info = () => {
			message.info(`User with id ${id} deleted`);
		};

		axios
			.delete(`/api/users/${id}`)
			.then(res => {
				setUsersList(usersList.filter(user => user.id !== id));
				info();
			})
			.catch(err =>
				console.log(`Error trying to delete user with ID ${id}`, err)
			);
	};

	return (
		<>
			<AddUser users={usersList} setUsers={setUsersList} />
			<EditUser
				users={usersList}
				setUsers={setUsersList}
				userToEdit={userToEdit}
			/>

			<div className='fetch__users__btn__container'>
				<Button
					type='primary'
					icon={<DownloadOutlined />}
					size='large'
					onClick={fetchUsers}
					style={{ marginTop: 50, marginBottom: 20 }}
				>
					Fetch Users
				</Button>
			</div>
			<User
				users={usersList}
				deleteUser={deleteUser}
				setUserToEdit={setUserToEdit}
			/>
		</>
	);
};

export default UsersList;
