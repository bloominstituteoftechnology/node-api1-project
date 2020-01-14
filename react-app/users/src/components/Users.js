import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import AddIcon from '@material-ui/icons/Add';

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.
            get("http://localhost:8000/api/users")
            .then(res => {
                console.log(res)
                setUsers(res.data)
            })
            .catch(err => console.log(err.response))
    }, [])

    return (
        <div>
            <Link to="add-user"><button className="button">Add Character</button></Link>
            <div className="user-container">
                {users.map(user => (
                    <div key={user.id} className="user">
                        <h3>{user.name}</h3>
                        <p>{user.bio}</p>
                        <Link to={`users/${user.id}`}><button>Update</button></Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Users;