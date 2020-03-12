import React, { useState } from "react";
import axios from "axios";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import User from "./User";

const UsersList = () => {
	const [usersList, setUsersList] = useState([]);
	const [userToEdit, setUserToEdit] = useState({});

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
				setUsersList(usersList.filter(user => user.id !== id));
				console.log(`User with ID ${id} has been deleted`);
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
			<button onClick={fetchUsers} className='fetchUsers__button'>
				Fetch Users
			</button>
			<User
				users={usersList}
				deleteUser={deleteUser}
				setUserToEdit={setUserToEdit}
			/>
		</>
	);
};

export default UsersList;
