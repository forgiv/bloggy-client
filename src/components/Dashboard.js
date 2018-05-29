import React from 'react'
import './styles/Dashboard.css'
import { connect } from 'react-redux'

const Dashboard = props => {
  return (
    <div>
      <h2>Dashboard</h2>
      <h3>{props.user.username}</h3>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  posts: state.posts
})

export default connect(mapStateToProps)(Dashboard)
