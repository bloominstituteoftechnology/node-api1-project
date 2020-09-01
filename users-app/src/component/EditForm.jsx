import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core'
//api
import { getUserById } from '../api/Users'
const initialState = {
    name: 'Royer',
    bio: 'Lambda student',
}

export default function EditForm() {
    // hooks
    const { push } = useHistory()
    // const params = useParams()
    const {id} = useParams()
    debugger
    const { register, handleSubmit, setValue } = useForm()
    // states
 

    //helperfunctions
    const onSubmitEditForm = (data) => {
        axios.put(`http://localhost:8080/api/users/${id}`, data)
            .then(res => {
                push('/')
            })
            .catch(error => {
                debugger
            })
    }
    useEffect(() => {
        getUserById(id)
            .then(resp => {
                debugger
                setValue('name', resp.data.name)
                setValue('bio', resp.data.bio)
            })
            .catch(err => {
                debugger
            })
    }, [])
    return (
        <div className='container'>

            <h1>Edit form</h1>
            <form onSubmit={handleSubmit(onSubmitEditForm)}>
                <TextField
                    id="new user name"
                    label="Name"
                    name='name'
                    inputRef={register()}
                />
                <TextField
                    id="new user bio"
                    label="Bio"
                    name='bio'
                    inputRef={register()}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                >
                    Edit User
          </Button>

            </form>
        </div>
    )
}
