import React from 'react'
import { clearStore } from '../actions/root'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Logout extends React.Component {
  componentWillMount() {
    localStorage.clear()
    this.props.dispatch(clearStore())
  }
  render() {
    return <Redirect to="/home" />
  }
}

export default connect()(Logout)
