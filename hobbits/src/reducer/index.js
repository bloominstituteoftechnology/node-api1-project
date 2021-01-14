import {FETCH_USERS_START,
     FETCH_USERS_SUCCESS,
     FETCH_USERS_FAILURE} from '../actions';

const initialState={
    isLoading: false,
    userInfo: [],
    error:'',
}

export const reducer=(state=initialState,action)=>{
    switch(action.type){
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
        default:
            return state;
    }
}