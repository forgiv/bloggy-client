import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'

const App = props => {
  if (props.user.username) {
    return (
      <div>
        <h1>{props.user.username}</h1>
      </div>
    )
  }
  return <LoginForm />
}

const mapStateToProps = state => ({
  loading: state.loading,
  user: state.user,
  authToken: state.authToken
})

export default connect(mapStateToProps)(App)
