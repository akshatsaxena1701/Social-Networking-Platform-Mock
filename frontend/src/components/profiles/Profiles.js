import {React,Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfiles } from '../../actions/profile'
import { useEffect } from 'react'
import ProfileItem from './ProfileItem'
const Profiles = ({getProfiles,profile})=>{
  
    useEffect(()=>{
         getProfiles();
    },[profile.loading])
  
    return (
    <Fragment>
        {profile.loading || profile===null? <Spinner></Spinner> : 
        
            <Fragment>
                <h1 className='large text-primary'>Developers</h1>
                <p className='lead'>
                    <i className='fab fa-connectdevelop'></i> Connect with Developers
                </p>

                <div>
                    {/* {profile.profiles===[] ? <Spinner></Spinner> : (profile.profiles.length > 0 ? (profile.profiles.map(profile=>(
                        <ProfileItem key={profile.id} profile={profile}></ProfileItem>
                    ))): <h4>No profiles found.</h4>)} */}
                    {profile.profiles.length > 0 ? (profile.profiles.map(profile=>(
                        <ProfileItem key={profile.id} profile={profile}></ProfileItem>
                    ))): <h4>No profiles found.</h4> }
                </div>

            </Fragment>
        }
    </Fragment>
  )
}

Profiles.propTypes = {
    getProfiles : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile : state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles)