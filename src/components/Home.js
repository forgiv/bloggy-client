import React from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './styles/Home.css'

const Home = props => {
  if (props.authToken) return <Redirect to="/dashboard" />
  return (
    <div className="Home">
      <h1>Bloggy</h1>
      <h2>How to get started:</h2>
      <p>
        Visit the <Link to="/register">registration page</Link> to create your<br />
        account. <br />
        <br />
        Sign up with a <strong>username</strong>, <strong>password</strong>, and
        a <strong>blog name</strong>.<br />
        <br />
        Once you've registered, sign in to your new account and write your first
        blog post.
      </p>
    </div>
  )
}

const mapStateToProps = state => ({
  authToken: state.auth.authToken
})

export default withRouter(connect(mapStateToProps)(Home))
