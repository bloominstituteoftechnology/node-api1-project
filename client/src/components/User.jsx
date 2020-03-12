import React from "react";

const User = ({ users, deleteUser, setUserToEdit }) => {
	return (
		<div className='userList__container'>
			{users.map((user, index) => (
				<div key={index}>
					<h2>{user.name}</h2>
					<p>{user.bio}</p>

					<button onClick={() => deleteUser(user.id)}>Delete User</button>
					<button onClick={() => setUserToEdit(user)}>Edit User</button>
				</div>
			))}
		</div>
	);
};

export default User;
