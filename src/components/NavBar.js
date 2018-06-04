import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './styles/NavBar.css'
import * as FontAwesome from 'react-fontawesome'

const NavBar = props => {
  if (props.user) {
    return (
      <nav className="NavBar">
        <ul>
          <li>
            <Link to="/logout" aria-label="Logout">
              <FontAwesome name="fas fa-sign-out-alt" />
            </Link>
          </li>
          <li>
            <Link to="/dashboard" aria-label="Dashboard">
              <FontAwesome name="fas fa-tachometer-alt" />
            </Link>
          </li>
          <li>
            <Link to={`/blog/${props.user.username}`} aria-label="Blog">
              <FontAwesome name="fas fa-align-justify" />
            </Link>
          </li>
          <li>
            <Link to="/dashboard/new" aria-label="New Post">
              <FontAwesome name="fas fa-edit" />
            </Link>
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav className="NavBar">
        <ul>
          <li>
            <Link to="/login" aria-label="Login" onClick={e => e.target.blur()}>
              <FontAwesome name="fas fa-sign-in-alt" />
            </Link>
          </li>
          <li>
            <Link to="/register" aria-label="Register">
              <FontAwesome name="fas fa-user-plus" />
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.authToken,
  user: state.user.user
})

export default withRouter(connect(mapStateToProps)(NavBar))
