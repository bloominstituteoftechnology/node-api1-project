import React from "react";
import {
	EditOutlined,
	UserDeleteOutlined,
	ExclamationCircleOutlined
} from "@ant-design/icons";
import { Card, Modal, Button } from "antd";

const { confirm } = Modal;

const User = props => {
	const { users, deleteUser, setUserToEdit, isLoading, setIsLoading } = props;

	// const showConfirm = e => {
	// 	confirm({
	// 		title: "Do you want to delete this user?",
	// 		icon: <ExclamationCircleOutlined />,
	// 		content: "You won't be able to undo this",
	// 		onOk() {
	// 			return new Promise((resolve, reject) => {
	// 				setTimeout(Math.random() > 0.5 ? resolve : reject, 200);

	// 				console.log("deleted", e.target);
	// 			}).catch(() => console.log("Oops errors!"));
	// 		},
	// 		onCancel() {}
	// 	});
	// };

	return (
		<>
			<div className='userList__container'>
				{users.map((user, index) => (
					<Card
						key={index}
						size='small'
						title={user.name}
						extra={
							<>
								<EditOutlined onClick={() => setUserToEdit(user)} />{" "}
								<UserDeleteOutlined onClick={() => deleteUser(user.id)} />
								{/* <UserDeleteOutlined onClick={showConfirm} /> */}
							</>
						}
						style={{ width: 300, marginTop: 20 }}
					>
						<p>{user.bio}</p>
					</Card>
				))}
			</div>
		</>
	);
};

export default User;
