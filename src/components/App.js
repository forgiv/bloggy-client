import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './Home'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Dashboard from './Dashboard'
import NewPost from './NewPost'
import Blog from './Blog'
import Logout from './Logout'
import Post from './Post'
import { getUserData } from '../actions/user'
import NavBar from './NavBar'
import './styles/App.css'

export class App extends React.Component {
  componentWillMount() {
    if (this.props.authToken)
      this.props.dispatch(getUserData(this.props.authToken))
  }

  render() {
    return (
      <Router>
        <main className="App">
          <Route path="/" component={NavBar} />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route
            exact
            path="/blog/:username"
            render={props => <Blog key={Date.now()} {...props} />}
          />
          <Route exact path="/blog/:username/:slug" component={Post} />
          <Route
            exact
            path="/dashboard"
            render={() =>
              this.props.authToken ? <Dashboard /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/dashboard/new"
            render={() =>
              this.props.authToken ? <NewPost /> : <Redirect to="/login" />
            }
          />
          <Route exact path="/logout" component={Logout} />
        </main>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.authToken
})

export default connect(mapStateToProps)(App)
