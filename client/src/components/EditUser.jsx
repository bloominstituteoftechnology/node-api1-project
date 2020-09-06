import React, {useState, useContext} from 'react';
import axios from "axios";

import {UsersContext} from "../App";

const EditUser = ({user, toggleEditing}) => {
    const [formState, setFormState] = useState({
        name: user.name,
        bio: user.bio
    })

    const {setUsers, users} = useContext(UsersContext);

    const onChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        axios.put(`http://localhost:5000/api/users/${user.id}`, formState).then(({data})=>{
            setUsers(users.map(user=>{
                if(user.id === data.id){
                    return data;
                }
                return user;
            }));
            toggleEditing();
        }).catch(err=>{
            console.log(err);
        });
    }
    return (
        <form onSubmit={onSubmit} className="user">
            <input onChange={onChange} value={formState.name} type="text" name="name"/>
            <input onChange={onChange} value={formState.bio} type="text" name="bio"/>
            <button onClick={toggleEditing}>Cancel</button>
            <button>Submit</button>
        </form>
    );
};

export default EditUser;