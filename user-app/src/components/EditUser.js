import React, {useState} from 'react';
import styled from 'styled-components'
import axios from 'axios'

const Input = styled.input`
font-size: 24px;
border:none;
border-bottom: 2px black solid;
margin: 4%;
text-align: center;
`

const EditUser = ({edit, user, setRender, render, setEdit}) => {
    const [updatedUser, setUpdatedUser] = useState({})

    const handleEdit = (e, update) =>{
        console.log(e,update)
        e.preventDefault()
        axios
        .put(`http://localhost:8000/api/users/${user.id}`, update)
        .then(res=>{console.log(res)
            setRender(!render)
            setEdit(!edit)
        }
            )
        .catch(err=>console.log(err))
    }

    return (
        <div>
            {edit?<form>
                <Input name='name' placeholder={user.name} onChange={(e)=>{setUpdatedUser({...updatedUser,[e.target.name]:e.target.value})}}></Input>
                <Input name='bio' placeholder={user.bio} onChange={(e)=>{setUpdatedUser({...updatedUser,[e.target.name]:e.target.value})}}></Input>
                <button onClick={(e)=>{handleEdit(e,updatedUser)}}>Confirm Edit</button>
            </form>:<></>}
        </div>
    );
};

export default EditUser;