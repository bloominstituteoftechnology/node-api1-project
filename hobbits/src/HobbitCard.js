import React from 'react';
import {Button, CardSubtitle, CardTitle} from 'reactstrap'
import {connect} from 'react-redux';
import {getUsers} from './actions';
import {Card} from 'reactstrap';


function HobbitCard(props){
 
return(
    <div >
       <Card className="hobbitCards">
           <CardTitle>{props.item.name}</CardTitle>
           <CardSubtitle>{props.item.bio}</CardSubtitle>
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

export default connect(mapStateToProps,{getUsers})(HobbitCard);