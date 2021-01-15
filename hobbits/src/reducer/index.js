import {FETCH_USERS_START,
     FETCH_USERS_SUCCESS,
     FETCH_USERS_FAILURE,
     ADD_USERS_START,
     ADD_USERS_SUCCESS,
     ADD_USERS_FAILURE,
     DELETE_USERS_START,
     DELETE_USERS_SUCCESS,
     DELETE_USERS_FAILURE,
     UPDATE_USERS_START,
     UPDATE_USERS_SUCCESS,
     UPDATE_USERS_FAILURE} from '../actions';
 
const initialState={
    isLoading: false,
    changed:false,
    userInfo: [],
    error:'',
}

export const reducer=(state=initialState,action)=>{
    switch(action.type){
        //getusers
        case FETCH_USERS_START:
            return {
                ...state,
                error:'',
                isLoading:true,
            }
        case FETCH_USERS_SUCCESS:
            return{
                ...state,
                error:'',
                isLoading:false,
                userInfo:action.payload
            }
        
        case FETCH_USERS_FAILURE:
            return{
                ...state,
                error:action.payload,
                isLoading:false,
            }
            //add users
        case ADD_USERS_START:
                return {
                    ...state,
                    changed:false,
                    error:'',
                    isLoading:true,
                }
        case ADD_USERS_SUCCESS:
                return{
                    ...state,
                    error:'',
                    isLoading:false,
                    changed:true,
                    userInfo: state.userInfo
                    }
        case ADD_USERS_FAILURE:
                return{
                    ...state,
                    changed:false,
                    error:action.payload,
                    isLoading:false,
                }
        //delete user
        case DELETE_USERS_START:
            return {
                ...state,
                error:'',
                isLoading:true,
            }
        case DELETE_USERS_SUCCESS:
            //payload is id
            console.log('userinfo in delete',state.userInfo)
            const newInfo = state.userInfo.filter(item=> item.id !== Number(action.payload))
            return{
                ...state,
                error:'',
                isLoading:false,
                userInfo: newInfo
            }
        
        case DELETE_USERS_FAILURE:
            return{
                ...state,
                error:action.payload,
                isLoading:false,
            }
        
            //update users
        case UPDATE_USERS_START:
                return {
                    ...state,
                    error:'',
                    isLoading:true,
                    changed:false,
                }
        case UPDATE_USERS_SUCCESS:
                console.log('action.payload',action.payload)
                console.log('userInfo:',state.userInfo)
                return{
                    ...state,
                    error:'',
                    isLoading:false,
                    changed:true,
                    // userInfo: action.payload
                    }
        case UPDATE_USERS_FAILURE:
                return{
                    ...state,
                    error:action.payload,
                    isLoading:false,
                    changed:false
               }
        default:
            return state;
    }
}