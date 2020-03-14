import React, { useState } from 'react';
import { Label, Row, Col, Form, Input, Button, FormGroup, Container } from 'reactstrap'
import axios from 'axios';

const AddNewUser = () => {
   const [newUser, setNewUser ] = useState('');

   const handleChanges = e => {
       setNewUser({
           ...newUser, 
           [e.target.name] : e.target.value
        });
   } ;

   const handleSubmit = e => {
       e.preventDefault();
       axios
        .post('http://localhost:4000/api/users/', newUser)
        .then (res => {
            console.log(res)
        })
        .catch(err =>{console.log(err)})
    };

    return (
       <Container>
           <Row>
               <Col xs='12' md={{ size: 8, offset: 3 }}>
                <Form inline onSubmit={handleSubmit} >
                    <FormGroup style ={{display:'flex', flexDirection:'column'}}>
                    <Label for='name'>Name</Label>
                        <Input
                            type='text'
                            name='name'
                            placeholder="Name"
                            onChange={handleChanges}
                        />
                    </FormGroup>
                    <FormGroup style ={{display:'flex', flexDirection:'column'}}>
                    <Label for='bio'>Bio</Label>
                        <Input
                            type='text'
                            name='bio'
                            placeholder="bio"
                            onChange={handleChanges}
                        />
                    </FormGroup>
                    <Button style ={{display:'flex', alignItems:'flex-end'}}>Add new user</Button>
                </Form>
               </Col>
           </Row>
       </Container>
    )
}
export default AddNewUser;