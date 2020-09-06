import React, {useState, useContext} from 'react';
import axios from "axios";

import {UsersContext} from "../App";

const AddUser = () => {
    const [formState, setFormState] = useState({
        name: "",
        bio: ""
    });

    const {setUsers, users} = useContext(UsersContext)

    const onChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e =>{
        e.preventDefault();
        axios.post("http://localhost:5000/api/users", formState).then(({data})=>{
            setUsers([...users, data]);
        }).catch(err=>{
            console.log(err);
        });
    }

    return (
        <form className="add-user" onSubmit={onSubmit}>
            <h1>Add a User</h1>
            <input onChange={onChange} value={formState.name} type="text" name="name" placeholder="name"/>
            <input onChange={onChange} value={formState.bio} type="text" name="bio" placeholder="bio"/>
            <button>Add</button>
        </form>
    );
};

export default AddUser;