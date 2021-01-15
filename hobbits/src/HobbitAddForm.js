import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Form,Button, Label,Input} from 'reactstrap'
import {connect} from 'react-redux';
import {addUsers} from './actions';

function HobbitAddForm(props){
    const history=useHistory();
    const {addUsers}= props
    const [newHobbit,setNewHobbit]=useState({
        name:'',
        bio:''
    })
   
    const handleChange=(e)=>{
        e.persist();
        setNewHobbit({
        ...newHobbit,
            [e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        addUsers(newHobbit);
        history.push('/');
        setNewHobbit({
            name:'',
            bio:''
        })
    }

return(
    <div className="addForm">
        <Form onSubmit={handleSubmit}>
            <Label htmlFor="name">Hobbit Name</Label>
            <Input name="name"
            id="name"
            value={newHobbit.name}
            onChange={handleChange}
            placeholder="Enter Hobbit Name..."
            />
            <Label htmlFor="bio">Hobbit Bio</Label>
            <Input name="bio"
            id="bio"
            value={newHobbit.bio}
            onChange={handleChange}
            placeholder="Enter Hobbit Bio..."
            />
            <Button color="success"
            className="m-2">Add Hobbit!</Button>
        </Form>
    </div>
)
}

const mapStateToProps =(state)=>{
    return{
        isLoading:state.isLoading,
        userInfo:state.userInfo,
        error:state.error
    }
}

export default connect(mapStateToProps,{addUsers})(HobbitAddForm);