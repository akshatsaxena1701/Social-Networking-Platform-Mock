import {
    REGISTER_SUCCESS,REGISTER_FAILED,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAILED,LOGOUT, CLEAR_PROFILE
} from '../actions/types.js'

const inintialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}

export default function(state=inintialState,action){
    const {type,payload}=action
    switch(type){
        case USER_LOADED:
            return {
                ...state,isAuthenticated:true,
                loading:false,
                user:payload
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token)
            return {
                ...state,...payload,isAuthenticated:null,loading:false
            }
        case REGISTER_FAILED:
        case AUTH_ERROR:
        case LOGIN_FAILED:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,token:null,isAuthenticated:false,loading:false
            }
        default:
            return state    
    }
}