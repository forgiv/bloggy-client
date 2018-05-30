import React from 'react'
import './styles/LoginForm.css'
import { connect } from 'react-redux'
import { getAuthToken } from '../actions/auth'
import { Redirect } from 'react-router-dom'
import { getUserData } from '../actions/user'

class LoginForm extends React.Component {
  componentWillMount() {
    if (this.props.authToken) {
      if (!localStorage.getItem('authToken')) {
        localStorage.setItem('authToken', this.props.authToken)
      }
      this.props.dispatch(getUserData(this.props.authToken))
    }
  }

  submitForm = e => {
    e.preventDefault()
    this.props.dispatch(getAuthToken(this.username.value, this.password.value))
  }

  render() {
    if (this.props.authToken && this.props.user) {
      localStorage.setItem('authToken', this.props.authToken)
      return <Redirect to="/dashboard" />
    }
    return (
      <form onSubmit={e => this.submitForm(e)} className="LoginForm">
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
  authToken: state.auth.authToken,
  user: state.user.user
})

export default connect(mapStateToProps)(LoginForm)
