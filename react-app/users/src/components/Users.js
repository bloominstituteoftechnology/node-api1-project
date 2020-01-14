import React, { useState, useEffect } from "react"
import axios from "axios"

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
            {users.map(user => (
                <div key={user.id}>
                    <p>{user.name}</p>
                    <p>{user.bio}</p>
                </div>
            ))}
        </div>
    )


}

export default Users;