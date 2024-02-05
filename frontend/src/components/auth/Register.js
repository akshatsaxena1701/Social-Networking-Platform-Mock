import React ,{Fragment,useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from "axios"
import {connect} from 'react-redux'
import {setAlert} from '../../actions/action'
import {register} from '../../actions/auth'
import PropTypes from 'prop-types'

const Register = ({setAlert,register,isAuthenticated}) => {
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        password2:""
    });

    const {name,email,password,password2}=formData

    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value})

    const onSubmit=async e=>{
        
        if(password!==password2){
            setAlert("password do not match",'danger')
            
        }else{
            register({name,email,password})
            // const newUser={
            //     name,
            //     email,
            //     password
            // }
            // try{
            //     const config={
            //         headers:{
            //             'Content-Type':'application/json'
            //         }
            //     }

            //     const body=JSON.stringify(newUser)
            //     const res=await axios.post('/api/user',body,config)
            //     console.log(res.data);
            // }catch(err){
            //     console.log(err.response.data)
            // }
        }
    }
    console.log(isAuthenticated)
    if(isAuthenticated){
      return <Redirect to='/dashboard'/>
    }

    return <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e=>onChange(e)}  />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={e=>onChange(e)} name="email" />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
      
            value={password}
            onChange={e=>onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
     
            value={password2}
            onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
}

Register.propTypes={
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
}

const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
})


export default connect(mapStateToProps,{setAlert,register})(Register)
