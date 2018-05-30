import React from 'react'
import './styles/Dashboard.css'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'
import { getUserData } from '../actions/user'
import Redirect from 'react-router-dom/Redirect'

class Dashboard extends React.Component {
  componentWillMount() {
    if (this.props.authToken) {
      this.props.dispatch(getUserData(this.props.authToken))
    }
  }

  render() {
    if (this.props.user) {
      return (
        <div>
          <h2>Dashboard</h2>
          <h3>{this.props.user.username}</h3>
          <Link to="/dashboard/new">new post</Link>
          <Link to={`/blog/${this.props.user.username}`}>view blog</Link>
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
