import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button, CardSubtitle, CardTitle} from 'reactstrap'
import {connect} from 'react-redux';
import {getUsers,addUsers,deleteUsers,updateUsers} from './actions';
import {Card} from 'reactstrap';

function HobbitCard(props){
    const history=useHistory();
    const {deleteUsers} = props
    
    const handleDelete=()=>{
     console.log('to delete')
     deleteUsers(props.item.id);
      
    }

    const handleUpdate=()=>{
       
        history.push(`/updatehobbits/${props.item.id}`)
       }

return(
    <div >
       <Card className="hobbitCards">
           <CardTitle><b>{props.item.name}</b></CardTitle>
           <CardSubtitle>{props.item.bio}</CardSubtitle>
           <Button color="info"
            className= "m-3"
            onClick={handleUpdate}>Update</Button>

           <Button color="danger"
             className= "m-3"
             onClick={handleDelete}>Delete</Button>
       </Card>
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

export default connect(mapStateToProps,{getUsers,addUsers,deleteUsers,updateUsers})(HobbitCard);