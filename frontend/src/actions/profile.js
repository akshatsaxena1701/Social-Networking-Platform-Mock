import axios from "axios";
import { setAlert } from "./action";
import { PROFILE_ERROR,GET_PROFILE,GET_PROFILES,CLEAR_PROFILE } from "./types";
import { BASE_URL } from "./helper";

export const getCurrentProfile = ()=>async dispatch=>{

    try{
        const res = await axios.get(`${BASE_URL}/api/profile/me`);
        console.log(res);
        dispatch({
            type : GET_PROFILE,
            payload : res.data
        })


    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload : {msg : err.response.statusText,status : err.response.status}

        })
    }    
}

export const getProfiles = ()=>async dispatch=>{
    dispatch({
        type:CLEAR_PROFILE
    });
    try{
        const res = await axios.get(`${BASE_URL}/api/profile`);
        console.log(res);
        dispatch({
            type : GET_PROFILES,
            payload : res.data
        })


    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload : {msg : err.response.statusText,status : err.response.status}

        })
    }    
}

export const getProfile = (userId)=>async dispatch=>{
    dispatch({
        type:CLEAR_PROFILE
    });
    try{
        const res = await axios.get(`${BASE_URL}/api/profile/user/${userId}`);
        console.log(res);
        dispatch({
            type : GET_PROFILE,
            payload : res.data
        })


    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload : {msg : err.response.statusText,status : err.response.status}

        })
    }    
}

// export const getGithubRepos = (username)=>async dispatch=>{
    
//     try{
//         const res = await axios.get('/api/profile');
//         console.log(res);
//         dispatch({
//             type : GET_PROFILES,
//             payload : res.data
//         })


//     }catch(err){
//         dispatch({
//             type:PROFILE_ERROR,
//             payload : {msg : err.response.statusText,status : err.response.status}

//         })
//     }    
// }

export const createProfile = (formData,history,edit=false)=> async dispatch =>{
       

     try {
        const config ={
            headers : {
                'Content-type' : 'application/json'
            }
        }
        const res = await axios.post(`${BASE_URL}/api/profile`,JSON.stringify(formData),config)    
        console.log(res);
        dispatch({
                type : GET_PROFILE,
                payload : res.data
        }) 

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'))
        history.push('/dashboard')

        
     } catch (err) {
        const errors = err.response.data.msg;
        console.log(errors);
        dispatch(setAlert(errors,'danger'))
        dispatch({
            type:PROFILE_ERROR,
            payload : {msg : err.response.statusText,status : err.response.status}
        })
     }   

    // try {
    //     const config ={
    //         headers : {
    //             'Content-type' : 'application/json'
    //         }
    //     }
        
    //     const res = await axios.post('/api/profile',JSON.stringify(formData),config)    
    //     dispatch({
    //         type : GET_PROFILE,
    //         payload : res.data
    //     })    

    //     dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'))
         
    //     if(!edit){
    //         history.push('/dashboard')
    //     }
    // } catch (err) {
    //     console.log(err.response);
    //     console.log('bhai error aaya hai')
    //     // const errors = err.response.data.msg;
    //     // console.log(errors);
    //     // // if(errors){
    //     // //     errors.map(error=>dispatch(setAlert(error.msg,'danger')))
    //     // // }
    //     // dispatch(setAlert(errors,'danger'))
    //     dispatch({
    //         type:PROFILE_ERROR,
    //         payload : {msg : err.response.statusText,status : err.response.status}
    //     })

        
    // }

}