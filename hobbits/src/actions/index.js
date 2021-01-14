import axios from 'axios';
export const FETCH_USERS_START= "FETCH_USERS_START";
export const FETCH_USERS_SUCCESS= "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE= "FETCH_USERS_FAILURE";

export const ADD_USERS_START= "ADD_USERS_START";
export const ADD_USERS_SUCCESS= "ADD_USERS_SUCCESS";
export const ADD_USERS_FAILURE= "ADD_USERS_FAILURE";

export const DELETE_USERS_START= "DELETE_USERS_START";
export const DELETE_USERS_SUCCESS= "DELETE_USERS_SUCCESS";
export const DELETE_USERS_FAILURE= "DELETE_USERS_FAILURE";

export const UPDATE_USERS_START= "UPDATE_USERS_START";
export const UPDATE_USERS_SUCCESS= "UPDATE_USERS_SUCCESS";
export const UPDATE_USERS_FAILURE= "UPDATE_USERS_FAILURE";

//get user .get
export const getUsers=()=>(dispatch)=>{
    dispatch({type: FETCH_USERS_START});
    axios
    .get('http://localhost:5000/api/users')
    .then(res=>{
        console.log('res in get',res)
        dispatch({type:FETCH_USERS_SUCCESS,
        payload:res.data})
    })
    .catch(err=>{
        console.log('err in get=',err)
        dispatch({type:FETCH_USERS_FAILURE,
        payload:err.data})
    })
}
//add user
export const addUsers=(payload)=>(dispatch)=>{
    dispatch({type: ADD_USERS_START});
    axios
    .post(`http://localhost:5000/api/users`,payload)
    .then(res=>{
        console.log('res in get',res)
        dispatch({type:ADD_USERS_SUCCESS,
        payload:res.data})
    })
    .catch(err=>{
        console.log('err in get=',err)
        dispatch({type:ADD_USERS_FAILURE,
        payload:err.data})
    })
}
//delete user
export const deleteUsers=(id)=>(dispatch)=>{
    dispatch({type: DELETE_USERS_START});
    axios
    .delete(`http://localhost:5000/api/users/${id}`)
    .then(res=>{
        console.log('res in get',res)
        dispatch({type:DELETE_USERS_SUCCESS,
        payload:id})
    })
    .catch(err=>{
        console.log('err in get=',err)
        dispatch({type:DELETE_USERS_FAILURE,
        payload:err.data})
    })
}

//update put req
// user
export const updateUsers=(id,user)=>(dispatch)=>{
    dispatch({type: UPDATE_USERS_START});
    axios
    .put(`http://localhost:5000/api/users/${id}`,user)
    .then(res=>{
        console.log('res in get',res)
        dispatch({type:UPDATE_USERS_SUCCESS,
        payload:res.data})
    })
    .catch(err=>{
        console.log('err in get=',err)
        dispatch({type:UPDATE_USERS_FAILURE,
        payload:err.data})
    })
}