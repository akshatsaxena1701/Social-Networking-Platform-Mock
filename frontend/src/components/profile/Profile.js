import React from 'react'
import { Fragment } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfile } from '../../actions/profile'
import { useEffect } from 'react'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
const Profile = ({getProfile,match,profile:{profile,loading},auth}) => {
    useEffect(()=>{
        getProfile(match.params.id)
    },[])

    
  return (
    <Fragment>
        {profile===null || loading ? 
        <Spinner></Spinner> : 
        <Fragment>
            <Link to='/profiles' className='btn btn-white'>
                Back to Profiles
            </Link>
            
            {auth.isAuthenticated && auth.loading===false && auth.user._id===profile.user._id &&
             <Link to='/edit-profile' className='btn btn-gray'>Edit Profile</Link>       
        }
        <div className='profile-grid my-1'>
            <ProfileTop profile={profile}/>
            <ProfileAbout profile={profile}></ProfileAbout>
        </div>

        </Fragment>
        }
    </Fragment>
  )
}

Profile.propTypes = {
    getProfile : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    profile : PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile : state.profile,
    auth:state.auth
})

export default connect(mapStateToProps,{getProfile})(Profile)