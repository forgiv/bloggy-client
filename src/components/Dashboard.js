import React from 'react'
import './styles/Dashboard.css'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'
import Redirect from 'react-router-dom/Redirect'
import { postClear } from '../actions/post'

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.dispatch(postClear())
  }

  render() {
    if (this.props.user) {
      return (
        <div className="Dashboard">
          <h1>Dashboard</h1>
          <h2>{this.props.user.username}</h2>
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
