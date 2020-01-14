import React, { useState, useEffect } from "react";
import axios from "axios";
import { getThemeProps } from "@material-ui/styles";


const AddUser = props => {

    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState({name: "", bio: ""})

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users")
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => console.log(err.response))
    })

    const handleChanges = e => {
        e.preventDefault();
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    const addUser = e => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/users", newUser)
            .then(res => {
                setNewUser({...users, newUser})
                props.history.push("/users")
            })
            .catch(err => console.log(err.response))
    }

    return (
        <div>
            <form>
                <div className="form">
                    <label>Name</label>
                    <input name="name" label="Name" onChange={handleChanges} value={newUser.name}/>
                    <label>Bio</label>
                    <textarea name="bio" label="Bio" onChange={handleChanges} value={newUser.bio}/>
                    <button onClick={addUser}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddUser;
