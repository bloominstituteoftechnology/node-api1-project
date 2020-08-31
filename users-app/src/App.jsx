// libraries
import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

//material design
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import { TextField } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


function App() {
  const classes = useStyles();
  //custome hooks
  const { register, handleSubmit, errors } = useForm()
  //states
  const [allUsersData, setAllUsersData] = useState()
  //helper functions
  const getAllUsers = () => {
    axios.get('http://localhost:8080/api/users')
      .then(resp => {
        setAllUsersData(resp.data)
        debugger
      })
      .catch(err => {
        debugger
      })
  }
  const displayAllUsers = () => {
    return allUsersData.map(user => {
      return (
        <section className="user" key={user.id}>
          <p>id: {user.id}</p>
          <p>name: {user.name}</p>
          <p>bio: {user.bio}</p>
        </section>
      )
    })
  }

  // get by id
  const [userByIdData, setUserByIdData] = useState()

  const onSubmitForGetById = (data) => {
    axios.get(`http://localhost:8080/api/users/${data.id}`)
      .then(resp => {
        setUserByIdData(resp.data)
      })
      .catch(err => {
        debugger
      })
  }
  const displayUserById = (user) => {
    return (
      <section className="user">
        <p>id: {user.id}</p>
        <p>name: {user.name}</p>
        <p>bio: {user.bio}</p>
      </section>
    )
  }

  //delete by id
  const [deleteUserByIdData, setDeleteUserByIdData] = useState()
  const onSubmitForDeleteById = (data) => {
    axios.delete(`http://localhost:8080/api/users/${data.id}`)
      .then(resp => {
        debugger
        setDeleteUserByIdData(resp.data)
      })
      .catch(err => {
        debugger
      })
  }
  const displayDeletionMessage = (errorResponse) => {
    debugger
    return (
      <section className="user">
        <p>{errorResponse.message}</p>
        <p>id: {errorResponse.user.id}</p>
        <p>name: {errorResponse.user.name}</p>
        <p>bio: {errorResponse.user.bio}</p>
      </section>
    )
  }

  //create a new user
  const [createNewUserData, setCreateNewUserData] = useState()
  const onSubmitForCreateUser = (params) => {
    axios.post('http://localhost:8080/api/users')
      .then(resp => {
        setCreateNewUserData(resp.data)
      })
  }
  const displayConfirmation = () =>{
    return(
      <h2>Success</h2>
    )
  }
  return (
    <div>
      <h1>User API test done in the front end instead of post man</h1>
      <section className="get-all-users">
        <h2>Get all users <span>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
            onClick={getAllUsers}
          >
            Send
      </Button>
        </span></h2>
        {allUsersData && displayAllUsers()}
      </section>
      <section className="get-user-by-id">
        <h2>Get user by id</h2>
        <form onSubmit={handleSubmit(onSubmitForGetById)}>
          <TextField id="standard-basic" label="ID" name='id'
            inputRef={register({ required: true })}
          />
          <Button variant="contained" color="secondary" type="submit">
            Submit ID
          </Button>
        </form>
        {userByIdData && displayUserById(userByIdData)}
      </section>
      <section className="delete-user-by-id">
        <form onSubmit={handleSubmit(onSubmitForDeleteById)}>
          <TextField id="standard-basic" label="ID" name='id'
            inputRef={register({ required: true })}
          />
          <Button variant="contained" color="secondary" type="submit">
            Submit ID
          </Button>
        </form>
        {deleteUserByIdData && displayDeletionMessage(deleteUserByIdData)}
      </section>
      <section className="create-new-user">
        <form onSubmit={handleSubmit(onSubmitForCreateUser)}>
          <TextField id="standard-basic" label="Name" name='name'
            inputRef={register({ required: true })}
          />
          <TextField id="standard-basic" label="Bio" name='bio'
            inputRef={register({ required: true })}
          />
          <Button variant="contained" color="secondary" type="submit">
            Create New User
          </Button>
        {createNewUserData && displayConfirmation(createNewUserData)}

        </form>
      </section>
    </div>
  )
}

export default App
