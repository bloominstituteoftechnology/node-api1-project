import React from "react";

const User = ({ users, deleteUser }) => {
	return (
		<>
			{users.map(user => (
				<div key={user.id}>
					<h2>{user.name}</h2>
					<p>{user.bio}</p>
					<button onClick={() => deleteUser(user.id)}>Delete User</button>
				</div>
			))}
		</>
	);
};

export default User;
