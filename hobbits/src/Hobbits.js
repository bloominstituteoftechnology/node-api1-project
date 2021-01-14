import React from 'react';
import {Button} from 'reactstrap'
import HobbitCard from './HobbitCard';
import {connect} from 'react-redux';
import {getUsers} from './actions';


function Hobbits(props){
const {getUsers} = props;
const {userInfo} = props;

const handleClick=()=>{
getUsers();
}

return(
    <div>
        <Button className="hobbitlist"
        onClick={handleClick}>
            List me the Hobbits!
        </Button>
        <div> 
        {props.isLoading ? "Please wait..." :
        props.userInfo.map(item=>{
            return <HobbitCard key={item.id} item={item}/>
            // console.log('item in userinfo=',item)
            
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
        error:state.error
    }
}

export default connect(mapStateToProps,{getUsers})(Hobbits);