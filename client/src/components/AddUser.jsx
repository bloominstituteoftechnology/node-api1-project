import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Input, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

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
				form.resetFields();
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

	const [form] = Form.useForm();

	return (
		<div className='add__user__form__container'>
			<h3>Join us</h3>
			<Form form={form} onFinish={handleSubmit} className='add__user__form '>
				<Form.Item
					name='name'
					rules={[
						{
							required: true,
							message: "Please input your name!"
						}
					]}
				>
					<Input
						name='name'
						value={newUser.name}
						placeholder='name'
						onChange={handleChange}
						allowClear
					/>
				</Form.Item>

				<Form.Item
					name='bio'
					rules={[
						{
							required: true,
							message: "Please input your bio!"
						}
					]}
				>
					<Input.TextArea
						name='bio'
						value={newUser.bio}
						placeholder='bio'
						onChange={handleChange}
						allowClear
					/>
				</Form.Item>
				<Button htmlType='submit' icon={<UserAddOutlined />}>
					{" "}
					Add User
				</Button>
			</Form>
		</div>
	);
};

export default AddUser;
