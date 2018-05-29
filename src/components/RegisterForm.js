import { apiURL } from '../config'

import React from 'react'
import './styles/RegisterForm.css'
import { Redirect } from 'react-router-dom'

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false,
      error: null
    }
  }

  submitForm = e => {
    e.preventDefault()
    fetch(`${apiURL}/users`, {
      method: 'POST',
      body: JSON.stringify({
        username: this.username.value,
        password: this.password.value,
        blog: this.blog.value
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          this.setState({ success: true })
        } else {
          this.setState({ error: data.message })
        }
      })
      .catch(err => this.setState({ error: err.message }))
  }

  render() {
    if (this.state.success) return <Redirect to="/login" />
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
        <label htmlFor="confirm">confirm</label>
        <input
          type="password"
          id="confirm"
          name="confirm"
          ref={e => (this.confirm = e)}
        />
        <label htmlFor="blog">blog name</label>
        <input type="text" id="blog" name="blog" ref={e => (this.blog = e)} />
        <input type="submit" value="register" />
        <div>{this.state.error ? this.state.error : ''}</div>
      </form>
    )
  }
}

export default RegisterForm
