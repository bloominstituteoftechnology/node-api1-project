import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import EditUser from './EditUser'

const UserWrap = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
`

const UserBox = styled.div`
background: whitesmoke;
margin: 1% auto;
padding: 30px;
width: 25%;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
button{
    margin: 3%;
    padding: 5px;
}
`


const Users = ({users, setRender, render}) => {
    const [edit, setEdit] = useState(false)
    const [currentUser, setCurrentUser] = useState()
    useEffect(()=>{
        console.log('users updated')
    }, [currentUser])

    console.log(users)
    return (
        <div>
            <UserWrap>
                {users.map(user=>
                   <UserBox key={user.id}>
                        <div>
                            <h3>{user.name}</h3>
                            <p>{user.bio}</p>
                        </div>
                        <div className='buttons'>
                            <button className='edit' onClick={()=>{
                                setCurrentUser(user)
                                setEdit(!edit)}}>edit</button>
                            <button className='delete'>delete</button>
                        </div>
                   </UserBox>
                )}
            </UserWrap>
            <EditUser edit={edit} user={currentUser} setEdit={setEdit} setRender={setRender} render={render}/>
        </div>
    );
};

export default Users;