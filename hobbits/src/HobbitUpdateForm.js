import React,{useState} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import {Form,Button, Label,Input} from 'reactstrap'
import {connect} from 'react-redux';
import {getUsers,updateUsers} from './actions';

function HobbitUpdateForm(props){
    const history=useHistory();
    const params=useParams();
    const {updateUsers}= props
    //update data
    const updateData= props.userInfo.filter(item=> item.id === Number(params.id))
    const setData=[{
        name:updateData[0].name,
        bio:updateData[0].bio
    }]
    const [updateHobbit,setUpdateHobbit]=useState(setData[0])
    
    const handleChange=(e)=>{
        e.persist();
        setUpdateHobbit({
        ...updateHobbit,
            [e.target.name]:e.target.value})
    }

    const handleBack=(e)=>{
        e.preventDefault();
        history.push('/')
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        updateUsers(params.id,updateHobbit);
        setUpdateHobbit({
            name:'',
            bio:''
        })
        history.push('/');
    }

return(
    <div className="addForm">
        <Form onSubmit={handleSubmit}>
            <Label htmlFor="name">Hobbit Name</Label>
            <Input name="name"
            id="name"
            value={updateHobbit.name}
            onChange={handleChange}
            placeholder="Enter Hobbit Name..."
            />
            <Label htmlFor="bio">Hobbit Bio</Label>
            <Input name="bio"
            id="bio"
            value={updateHobbit.bio}
            onChange={handleChange}
            placeholder="Enter Hobbit Bio..."
            />
            <Button color="info"
            className="m-2">Update Hobbit!</Button>

            <Button color="secondary"
            className="m-2"
            onClick={handleBack}>Back</Button>
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

export default connect(mapStateToProps,{getUsers,updateUsers})(HobbitUpdateForm);