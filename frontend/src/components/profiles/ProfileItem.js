import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
const ProfileItem = ({profile : {
    user : {_id,name,avatar},
    status,company,location,skills
}}) => {


  return (
    <div className='profile bg-light'>
        <img  src={avatar} className='round-img'></img>
        <div>
            <h2>{name}</h2>
            <p>{status} {company && <span>at {company}</span>}</p>
            <p className='my-1'>{location && <span>{location}</span>}</p>
            <Link to={`/profile/${_id}`} className='btn btn-primary'>Link to Profile</Link>
        </div>
        <div>
            {skills.map((skill,index)=>{
                return <p key={index}><i className='fa fa-check'></i> {skill}</p>
            })}
        </div>
    </div>
  )
}

ProfileItem.propTypes = {
    profile : PropTypes.object.isRequired
}

export default ProfileItem