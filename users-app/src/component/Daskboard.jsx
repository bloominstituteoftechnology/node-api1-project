// libraries
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

//material design
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import { TextField } from '@material-ui/core'


//react router
import { useHistory, BrowserRouter, Route, Switch } from 'react-router-dom'

//api
import { getUserById } from '../api/Users'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))


function Dashboard() {
  // hook
  const { push } = useHistory()

  const classes = useStyles()
  //custome hooks
  const { register, handleSubmit } = useForm()
  //states
  const [allUsersData, setAllUsersData] = useState()
  const [reRun, setReRun] = useState(false)
  const [currentUserIdForEditing, setCurrentUserIdForEditing] = useState()
  //get all users

  const displayAllUsers = () => {
    return allUsersData.map(user => {
      return (
        <section className="user" key={user.id}>
          <p>id: {user.id}</p>
          <p>name: {user.name}</p>
          <p>bio: {user.bio}</p>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setCurrentUserIdForEditing(user.id)
              push(`/editform/${user.id}`)
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              onSubmitForDeleteById(user)
            }}
          >
            Delete
          </Button>
        </section>
      )
    })
  }
  useEffect(() => {
    axios.get('http://localhost:8080/api/users')
      .then(resp => {
        console.log('testing on get all users')
        setAllUsersData(resp.data)
        debugger
      })
      .catch(err => {
        debugger
      })
  }, [reRun])
  // get by id
  const [userByIdData, setUserByIdData] = useState()

  const onSubmitForGetById = (data) => {
    setReRun(!reRun)
    debugger
    getUserById(data.id)
      .then(resp => {
        debugger
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
    setReRun(!reRun)
    axios.delete(`http://localhost:8080/api/users/${data.id}`)
      .then(resp => {
        debugger
        setDeleteUserByIdData(resp.data)
      })
      .catch(err => {
        debugger
      })
  }


  //create a new user
  const [createNewUserData, setCreateNewUserData] = useState()
  const onSubmitForCreateUser = (createNewUser) => {
    setReRun(!reRun)
    debugger
    axios.post('http://localhost:8080/api/users', createNewUser)
      .then(resp => {
        debugger
        setCreateNewUserData(resp.data)
      })
      .catch((err) => {
        debugger
      }
      )
  }
  const displayConfirmation = () => {
    return (
      <h2>Success</h2>
    )
  }


  return (
    <div className='container'>
      <h1>User API test done in the front end instead of post man</h1>
      <section className="create-new-user">
        {/* after all of the previous data is delete then it work to be expected, Addes infinitly. After a refresh it resets the problem. It goes to the delete text input */}
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit(onSubmitForCreateUser)}>
          <TextField id="new user name" label="Name" value='Royer' name='name'
            inputRef={register()}
          />
          <TextField id="new user bio" label="Bio" value='The student' name='bio'
            inputRef={register()}
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
          >
            Create New User
          </Button>

        </form>
        {createNewUserData && displayConfirmation(createNewUserData)}
      </section>
      <section className="get-all-users">
        <h2>Get all users <span><Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<Icon>send</Icon>}
          onClick={() => setReRun(!reRun)}
        >
          Get users now
      </Button></span></h2>
        {allUsersData && displayAllUsers()}
      </section>
      <section className="get-user-by-id">
        <h2>Get user user by id</h2>
        <form onSubmit={handleSubmit(onSubmitForGetById)}>
          <TextField
            id="get-user"
            label="ID"
            name='id'
            inputRef={register()}
            type='number'
          />
          <Button variant="contained" color="secondary" type="submit">
            Submit Id and get user
          </Button>
        </form>
        {userByIdData && displayUserById(userByIdData)}
      </section>

    </div>
  )
}

export default Dashboard
