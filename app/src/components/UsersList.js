import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card, CardTitle, CardText, Button } from 'reactstrap';
import axios from 'axios';
import AddNewUser from "./AddNewUser.js"

const UsersList = (props) =>{
    ///console.log("Props in userList", props)
    const [usersList, setUserList ] = useState([]);

 useEffect(() => {
        axios
        .get("http://localhost:4000/api/users/")
        .then(response => {
           setUserList(response.data.user)
           //console.log("Get request response", response)  
        })
        .catch(err => console.log(err))
 }, [usersList]);

 const deleteUser = (id) => {
     axios
     .delete(`http://localhost:4000/api/users/${id}`)
     .then(res => {
        console.log("USER DELETED" ,res)
         //props.history.push('/api/users/')
     })
     .catch(err => console.log(err));
 }
    return(
        <div>
            <AddNewUser/>
                <div className='cards-wrapper'>
                    {usersList.map(user => {
                        return(
                    <Container style={{ margin: '50px auto' }} className='card-wrapper'>
                        <Row>
                            <Col xs='12' lg={{ size: 4, offset: 4 }} >
                                <Card key ={user.id}>
                                    <CardTitle>{user.name}</CardTitle>
                                    <CardText>{user.bio}</CardText>
                                    <Button onClick= {() =>deleteUser(user.id)}>x</Button>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                        )
                    })}
                </div>
        </div>
    )
    
}
export default UsersList;