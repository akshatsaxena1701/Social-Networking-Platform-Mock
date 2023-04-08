import axios from 'axios'
import {
    REGISTER_SUCCESS,REGISTER_FAILED, USER_LOADED, AUTH_ERROR,LOGIN_FAILED,LOGIN_SUCCESS,LOGOUT,CLEAR_PROFILE
} from './types'
import {setAlert} from './action'
import setAuthToken from '../utils/setAuthToken'
import { BASE_URL } from './helper'

//Load USer
export const loadUser=()=>async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res=await axios.get(`${BASE_URL}/api/auth`)
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}




//Regitser uSer





export const register=({
    name,email,password
})=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body=JSON.stringify({name,email,password});
    try{
        const res=await axios.post(`${BASE_URL}/api/user`,body,config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })

        dispatch(loadUser())
    }catch(err){

        const errors=err.response.data.errors;
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:REGISTER_FAILED
        })
    }
}


//login user


export const login=({
   email,password
})=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body=JSON.stringify({email,password});
    try{
        const res=await axios.post(`${BASE_URL}/api/auth`,body,config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })

        dispatch(loadUser())
    }catch(err){

        const errors=err.response.data.errors;
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:LOGIN_FAILED
        })
    }
}

export const logout=() => dispatch =>{
    console.log(123);
    dispatch({
        type : CLEAR_PROFILE
    })
    dispatch({
        type:LOGOUT
    });
}