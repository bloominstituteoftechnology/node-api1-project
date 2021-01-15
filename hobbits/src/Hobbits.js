import React,{useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Button} from 'reactstrap'
import HobbitCard from './HobbitCard';
import {connect} from 'react-redux';
import {getUsers,addUsers,deleteUsers,updateUsers} from './actions';

function Hobbits(props){
const history=useHistory();
const {getUsers}=props;
 

useEffect(()=>{
    getUsers()
},[getUsers,props.changed])

  
const addHobbits=()=>{
    console.log(history)
    history.push('./addhobbits')
}

return(
    <div>
        <Button className="hobbitlist"
        outline color="success"
        size="lg"
        onClick={addHobbits}>
            <b>Add new Hobbits!</b>
        </Button>
        <div> 
        {props.isLoading ? "Please wait..." :
        props.userInfo.map(item=>{
            return <HobbitCard   key={item.id} item={item}/>
        })
        }
        </div>
    </div>
)
}

const mapStateToProps =(state)=>{
    return{
        isLoading:state.isLoading,
        userInfo:state.userInfo,
        error:state.error,
        changed:state.changed,
    }
}

export default connect(mapStateToProps,{getUsers,addUsers,deleteUsers,updateUsers})(Hobbits);