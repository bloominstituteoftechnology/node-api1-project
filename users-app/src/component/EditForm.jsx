import React, {useEffect}from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core'
//api
import {getUserById} from '../api/Users'

export default function EditForm() {
    const { push } = useHistory()
    const {id} = useParams()
    const { register, handleSubmit } = useForm()

    const onSubmitEditForm = (data) => {
        axios.put(`http://localhost:8080/api/users/${id}`, data)
            .then(res => {


                push('/dashboard')
            })
            .catch(error => {
                debugger
            })
    }
useEffect(() => {
    getUserById(id)
}, [])
    return (
        <div className='container'>

            <h1>Edit form</h1>
            <form onSubmit={handleSubmit(onSubmitEditForm)}>
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
        </div>
    )
}
