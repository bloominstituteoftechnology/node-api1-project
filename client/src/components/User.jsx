import React, {useState} from 'react';

import EditUser from "./EditUser";

const User = ({user, deleteUser}) => {
    const [editing, setEditing] = useState(false);

    const toggleEditing = () => {
        setEditing(!editing);
    }
    if(!editing){
        return (
            <div className="user">
                <h3>{user.name}</h3>
                <p>{user.bio}</p>
                <button onClick={toggleEditing}>Edit</button>
                <button onClick={()=> deleteUser(user.id)}>Delete</button>
            </div>
        )
    }else if(editing){
        return (
            <EditUser toggleEditing={toggleEditing} user={user}/>
        )
    }
};

export default User;