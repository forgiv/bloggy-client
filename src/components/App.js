import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './Home'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Dashboard from './Dashboard'
import NewPost from './NewPost'

const App = props => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
        <Route
          exact
          path="/dashboard"
          render={() =>
            props.authToken ? <Dashboard /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/dashboard/new"
          render={() =>
            props.authToken ? <NewPost /> : <Redirect to="/login" />
          }
        />
      </div>
    </Router>
  )
}

const mapStateToProps = state => ({
  loading: state.loading,
  user: state.user,
  authToken: state.authToken,
  error: state.error
})

export default connect(mapStateToProps)(App)
