import React from "react";
import {
	EditOutlined,
	UserDeleteOutlined,
	ExclamationCircleOutlined
} from "@ant-design/icons";
import { Card } from "antd";

const User = props => {
	const { users, deleteUser, setUserToEdit } = props;

	return (
		<>
			<div className='userList__container'>
				{users.map((user, index) => (
					<Card
						className='userCard'
						key={index}
						size='small'
						title={user.name}
						extra={
							<>
								<EditOutlined onClick={() => setUserToEdit(user)} />{" "}
								<UserDeleteOutlined onClick={() => deleteUser(user.id)} />
							</>
						}
						style={{ marginTop: 20 }}
						hoverable={true}
					>
						<p>{user.bio}</p>
					</Card>
				))}
			</div>
		</>
	);
};

export default User;
