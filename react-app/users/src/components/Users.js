import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

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
        <div className="user-container">
            {users.map(user => (
                <div key={user.id} className="user">
                    <h3>{user.name}</h3>
                    <p>{user.bio}</p>
                    <Link to={`users/${user.id}`}><button>Update</button></Link>
                </div>
            ))}
        </div>
    )
}

export default Users;