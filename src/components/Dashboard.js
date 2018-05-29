import React from 'react'
import './styles/Dashboard.css'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'

const Dashboard = props => {
  return (
    <div>
      <h2>Dashboard</h2>
      <h3>{props.user.username}</h3>
      <Link to="/dashboard/new">new post</Link>
      <Link to={`/blog/${props.user.username}`}>view blog</Link>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(Dashboard)
