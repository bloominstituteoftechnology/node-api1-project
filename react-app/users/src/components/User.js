import React, { useState, useEffect } from "react";
import axios from "axios";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const User = props => {
    console.log(props)

    const [user, setUser] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/users/${props.match.params.id}`)
            .then(res => {
                console.log(res)
                setUser(res.data)
            })
            .catch(err => console.log(err.response))
    }, [props.match.params.id])

    const editUser = e => {
        e.preventDefault();
        props.history.push(`/update-user/${user.id}`);
    }

    const deleteUser = e => {
        e.preventDefault();
        axios
            .delete(`http://localhost:8000/api/users/${user.id}`)
            .then(res => {
                setUser(res.data)
                props.history.push("/users")
            })
            .catch(err => console.log(err.response))
    }

    return (
        <div className="user" style={{margin: "0 auto"}}>
            <h3>{user.name}</h3>
            <p>{user.bio}</p>
            <button onClick={editUser}><EditIcon /></button>
            <button onClick={deleteUser}><DeleteIcon /></button>
        </div>
    )
}

export default User;
