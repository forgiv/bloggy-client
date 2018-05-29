import React from 'react'
import './styles/LoginForm.css'
import { connect } from 'react-redux'
import { getAuthToken } from '../actions/auth'
import { Redirect } from 'react-router-dom'

class LoginForm extends React.Component {
  submitForm = e => {
    e.preventDefault()
    this.props.dispatch(getAuthToken(this.username.value, this.password.value))
  }

  render() {
    if (this.props.authToken) return <Redirect to="/dashboard" />
    return (
      <form onSubmit={e => this.submitForm(e)}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          name="username"
          ref={e => (this.username = e)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={e => (this.password = e)}
        />
        <input type="submit" value="login" />
      </form>
    )
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  authToken: state.auth.authToken
})

export default connect(mapStateToProps)(LoginForm)
