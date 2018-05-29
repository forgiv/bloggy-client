import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './Home'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Dashboard from './Dashboard'
import NewPost from './NewPost'
import Blog from './Blog'

const App = props => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/:username" component={Blog} />
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
  user: state.auth.user,
  authToken: state.auth.authToken
})

export default connect(mapStateToProps)(App)
