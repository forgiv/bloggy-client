import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './styles/NavBar.css'
import * as FontAwesome from 'react-fontawesome'

export const NavBar = props => {
  if (props.user) {
    return (
      <nav className="NavBar">
        <ul>
          <li>
            <Link to="/bloggy/logout" aria-label="Logout">
              <FontAwesome name="fas fa-sign-out-alt" />
            </Link>
          </li>
          <li>
            <Link to="/bloggy/dashboard" aria-label="Dashboard">
              <FontAwesome name="fas fa-tachometer-alt" />
            </Link>
          </li>
          <li>
            <Link to={`/bloggy/blog/${props.user.username}`} aria-label="Blog">
              <FontAwesome name="fas fa-align-justify" />
            </Link>
          </li>
          <li>
            <Link to="/bloggy/dashboard/new" aria-label="New Post">
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
            <Link
              to="/bloggy/login"
              aria-label="Login"
              onClick={e => e.target.blur()}
            >
              <FontAwesome name="fas fa-sign-in-alt" />
            </Link>
          </li>
          <li>
            <Link to="/bloggy/register" aria-label="Register">
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
