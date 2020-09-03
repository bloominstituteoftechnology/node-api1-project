import React from 'react';
import {
	TextField,
	Button,
	Box,
	makeStyles,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const useStyles = makeStyles({
	container: {
		padding: '5%',
		width: '30%',
		background: 'white',
		borderRadius: '20px',
		transform: 'translateY(100%)',
		margin: '0 auto',
	},
	field: {
		margin: '20px auto',
	},
});

export default function Form(props) {
	const { handleSubmit, register, errors, formState } = useForm({
		mode: 'onChange',
	});
	const classes = useStyles();
	const submitAdd = (data) => {
		axios
			.post('http://localhost:8000/api/users', data)
			.then((res) => {
				props.setUsers([...props.users, res.data]);
				props.setAdding(false);
			})
			.catch((err) => {
				alert(err.message);
			});
	};
	const submitEdit = (data) => {
		axios
			.put(`http://localhost:8000/api/users/${props.user.id}`, data)
			.then((res) => {
				const edited = props.users.map((user) => {
					if (user.id === props.user.id) {
						return res.data;
					} else {
						return user;
					}
				});
				props.setUsers(edited);
				props.setEditing(false);
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	if (formState.isSubmitting) {
		return (
			<Box className={classes.container}>
				<Typography>Loading...</Typography>
				<CircularProgress color='secondary' />
			</Box>
		);
	}

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(props.edit ? submitEdit : submitAdd)}
			className={classes.container}
		>
			<Typography variant='h3' color='initial'>
				{props.title}
			</Typography>
			<TextField
				fullWidth={true}
				className={classes.field}
				autoFocus
				variant='outlined'
				type='text'
				id='name'
				name='name'
				inputRef={register({ required: 'Required' })}
				defaultValue={props.user.name ? props.user.name : ''}
				label='Name:'
				error={errors.name ? true : false}
				helperText={errors.name ? errors.name.message : null}
			/>

			<TextField
				fullWidth={true}
				className={classes.field}
				variant='outlined'
				type='text'
				id='bio'
				name='bio'
				inputRef={register({ required: 'Required' })}
				defaultValue={props.user.bio ? props.user.bio : ''}
				label='Bio:'
				error={errors.bio ? true : false}
				helperText={errors.bio ? errors.bio.message : null}
			/>

			<Button
				fullWidth
				variant='contained'
				color='primary'
				size='large'
				type='submit'
				disabled={!formState.isValid}
			>
				Submit
			</Button>
		</Box>
	);
}
