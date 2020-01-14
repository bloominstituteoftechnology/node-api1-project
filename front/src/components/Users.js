import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/')
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [users]);

    // console.log(users[0]);

    // const handleDelete = e => {

    // }

    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <p>{user.id}</p>
                    <p>{user.name}</p>
                    <p>{user.bio}</p>
                    {/* <button>Edit</button> */}
                    <button onClick={(() => {
                        // e.preventDefault();
                        axios.delete(`http://localhost:8000/api/users/${user.id}`)
                    })}>Delete</button>
                </div>
            ))}
        </div>
    );

};

export default Users;
