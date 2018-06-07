import React from 'react'
import { clearStore } from '../actions/root'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export class Logout extends React.Component {
  componentWillMount() {
    localStorage.removeItem('authToken')
    this.props.dispatch(clearStore())
  }
  render() {
    return <Redirect to="/" />
  }
}

export default connect()(Logout)
