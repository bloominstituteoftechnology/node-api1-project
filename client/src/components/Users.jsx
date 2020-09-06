import React, {useContext} from 'react';
import axios from "axios";
import {UsersContext} from "../App";

import User from "./User";

const Users = () => {
    const {users, setUsers} = useContext(UsersContext);
    const deleteUser = (id) => {
        axios.delete(`http://localhost:5000/api/users/${id}`).then(({data})=>{
            const deletedUser = data;
            setUsers(users.filter(user=> user.id !== deletedUser.id));
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className="users">
            {Array.isArray(users) === true && !users[0] &&
                <div>No users found</div> 
            }
            {Array.isArray(users) === true && users.map(user=>{
                return(
                    <User deleteUser={deleteUser} key={user.id} user={user}/>
                )
             })}
        </div>
    );
};

export default Users;