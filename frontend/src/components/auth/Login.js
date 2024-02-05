import React ,{Fragment,useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from "axios"
import {login} from '../../actions/auth'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
const Login = ({login,auth:{isAuthenticated,user}}) => {
    const [formData,setFormData]=useState({
      
        email:"",
        password:"",

    });

    const {email,password}=formData

    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value})

    const onSubmit=async e=>{
        e.preventDefault()
            login({email,password})
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
    if(isAuthenticated===true){
      console.log(user._id)
      return <Redirect to={{pathname:`/profile/${user._id}`}}></Redirect>
    }
    return <Fragment>
        <h1 className="large text-primary">Sign IN</h1>
      <p className="lead"><i className="fas fa-user"></i> Login to Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
      
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
            minLength="6"
            value={password}
            onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </Fragment>
}

Login.propTypes={
  login:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
}

const mapStateToProps=state=>({
  auth:state.auth
})

export default connect(mapStateToProps,{login})(Login)
