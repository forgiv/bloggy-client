import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const NavBar = props => {
  if (props.user) {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to={`/blog/${props.user.username}`}>Blog</Link>
          </li>
          <li>
            <Link to="/dashboard/new">New Post</Link>
          </li>
        </ul>
      </nav>
    )
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  )
}

const mapStateToProps = state => ({
  authToken: state.auth.authToken,
  user: state.user.user
})

export default withRouter(connect(mapStateToProps)(NavBar))
