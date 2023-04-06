import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import { useEffect } from 'react'
import Spinner from '../layout/Spinner'
const Dashboard = ({auth:{user},getCurrentProfile,profile}) => {

    useEffect(()=>{
        getCurrentProfile()
    },[])
    console.log(profile.loading)
  if(profile.loading){
      return <Spinner></Spinner>
  }else{
      return (
          <Fragment>
              <h1>Dashboard</h1>
              <h4>Welcome {user && user.name}</h4>
          </Fragment>
      )
  }  
  
}

Dashboard.propTypes = {
    getCurrentProfile : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    profile : PropTypes.object.isRequired
}

const mapStateToProps = state=>({
    auth : state.auth,
    profile : state.profile
})

export default connect(mapStateToProps,{getCurrentProfile}) (Dashboard)