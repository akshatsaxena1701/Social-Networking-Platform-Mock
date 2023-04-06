import React, { Fragment } from 'react'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'

const Navbar = ({auth : {isAuthenticated,loading},logout}) => {

    const guestlinks = 
      <ul>
        <li><Link to="profiles.html">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    
    const authlinks = 
    <ul>
        <a><Link to="/dashboard">DashBoard</Link></a>
        <a onClick={logout} href='#!'>Logout</a>
    </ul>

    return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      { 
        !loading && (<Fragment>{isAuthenticated ? authlinks : guestlinks}</Fragment>)
      }
    </nav>
    )
}

Navbar.propTypes = {
  logout : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired
}

const mapStateToProps=state=>({
  auth : state.auth
})

export default connect(mapStateToProps,{logout})(Navbar)
