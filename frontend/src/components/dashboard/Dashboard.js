import {React, Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import { useEffect } from 'react'
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'
import DashboardActions from './DashboardActions'
const Dashboard = ({auth:{user},getCurrentProfile,profile}) => {

    useEffect(()=>{
        getCurrentProfile()
    },[])
    console.log(profile.loading)
  if(profile.loading && profile.profile==null){
      return <Spinner></Spinner>
  }else{
      return (
          <Fragment>
              <h1>Dashboard</h1>
              <p className='lead'>Welcome {user && user.name}</p>

              {profile.profile!==null ? 
              <Fragment>
                  <DashboardActions></DashboardActions>
              </Fragment> : 
              <Fragment>
                    <p>You don't have a profile</p>
                    <btn><Link to='/create-profile'>Create Profile</Link></btn>  
                </Fragment>}  

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