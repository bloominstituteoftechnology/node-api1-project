import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const UpdateUser = props => {
    const [userToEdit, setUserToEdit] = useState({name: "", bio: ""})

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/users/${props.match.params.id}`)
            .then(res => {
                console.log(res)
                setUserToEdit(res.data)
            })
            .catch(err => console.log(err.response))
    }, [props.match.params.id])

    const handleChanges = e => {
        e.preventDefault();
        setUserToEdit({...userToEdit, [e.target.name]: e.target.value})
    }

    const submitForm = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/users/${userToEdit}`, userToEdit)
            .then(res => {
                setUserToEdit(res.data)
                props.history.push(`/users/${userToEdit.id}`)
            })
            .catch(err => console.log(err.response))
    }

    return (
        <div>
            <form>
                <div className="update-form">
                    <label>Name</label>
                    <input name="name" label="Name" onChange={handleChanges} value={userToEdit.name}/>
                    <label>Bio</label>
                    <textarea name="bio" label="Bio" onChange={handleChanges} value={userToEdit.bio}/>
                </div>
                <button onClick={submitForm}>Save</button>
            </form>
        </div>
    )
}

export default UpdateUser;