import {React,Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { useState } from 'react'
import { createProfile,getCurrentProfile } from '../../actions/profile'
import {Link,withRouter,Redirect} from 'react-router-dom'
const EditProfile = ({profile :{profile,loading},createProfile,history}) => {


    const [formData,setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: ''
    })

    useEffect(()=>{
        getCurrentProfile();

        setFormData({
            company : loading || !profile.company ? '' : profile.company,
            website : loading || !profile.website ? '' : profile.website,
            location : loading || !profile.location ? '' : profile.location,
            status : loading || !profile.status ? '' : profile.status,
            githubusername : loading || !profile.githubusername ? '' : profile.githubusername,
            bio : loading || !profile.bio ? '' : profile.bio,
            skills : loading || !profile.skills ? '' : profile.skills
        })

    },[loading])

    const {company,website,location,bio,status,githubusername,skills}=formData;


    const onSubmit = (e) =>{
      e.preventDefault();
      createProfile(formData,history,true)
    }

    const onChange = (e)=>{
        setFormData({
            ...formData,[e.target.name ]: e.target.value
        })
    }

  return (
    <Fragment>
              <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <select value={status} onChange={e=>onChange(e)} name="status">
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input value={company} onChange={e=>onChange(e)} type="text" placeholder="Company" name="company" />
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input value={website} onChange={e=>onChange(e)} type="text" placeholder="Website" name="website" />
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input value={location} onChange={e=>onChange(e)} type="text" placeholder="Location" name="location" />
          <small className="form-text"
            >City and state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input value={skills} onChange={e=>onChange(e)} type="text" placeholder="* Skills" name="skills" />
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            value={githubusername} onChange={e=>onChange(e)}
            type="text"
            placeholder="Github Username"
            name="githubusername"
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username
            </small>
        </div>
        <div className="form-group">
          <textarea value={bio} onChange={e=>onChange(e)} placeholder="A short bio of yourself" name="bio"></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <input type="submit" class="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

EditProfile.propTypes = {
  createProfile : PropTypes.func.isRequired,
  profile : PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile : state.profile
})

export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(EditProfile))
