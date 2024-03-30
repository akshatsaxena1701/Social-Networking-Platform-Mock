import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
const Landing = ({auth : {isAuthenticated,user}}) => {



    return (
        <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">            
          Developer Connector
          </h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          {isAuthenticated==true ? 
            <div className='buttons'>
              <Link to='/profiles'>Explore Developers</Link>
              </div> : 
            <div className="buttons">
            <Link to="/register" class="btn btn-primary">Sign Up</Link>
            <Link to="/login" class="btn btn-light">Login</Link>
            </div>
          }
          
        </div>
      </div>
    </section>
    )
}

const mapStateToProps = state =>({
  auth : state.auth
})

export default connect(mapStateToProps) (Landing)
