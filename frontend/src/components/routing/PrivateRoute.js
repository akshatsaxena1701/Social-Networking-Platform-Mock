import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'

const PrivateRoute = ({auth : {isAuthenticated,loading},component:Component,...rest}) => {
  if(!isAuthenticated && !loading){
      return <Redirect {...rest} to='/login'></Redirect>
  }else{
      return <Component></Component>
  }
  
}

PrivateRoute.propTypes = {
    auth : PropTypes.object.isRequired
}

const mapStateToProps = state=>({
    auth : state.auth
})

export default connect(mapStateToProps)(PrivateRoute)