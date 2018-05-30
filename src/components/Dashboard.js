import React from 'react'
import './styles/Dashboard.css'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'
import Redirect from 'react-router-dom/Redirect'

class Dashboard extends React.Component {
  render() {
    if (this.props.user) {
      return (
        <div>
          <h2>Dashboard</h2>
          <h3>{this.props.user.username}</h3>
          <Link to="/dashboard/new">new post</Link>
          <Link to={`/blog/${this.props.user.username}`}>view blog</Link>
          <Link to="/logout">logout</Link>
        </div>
      )
    }
    return <Redirect to="/login" />
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  authToken: state.auth.authToken
})

export default connect(mapStateToProps)(Dashboard)
