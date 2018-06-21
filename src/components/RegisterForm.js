import { apiURL } from '../config'

import React from 'react'
import './styles/RegisterForm.css'
import { Redirect } from 'react-router-dom'
import { reduxForm, Field, SubmissionError, focus } from 'redux-form'
import Input from './Input'
import { required, nonEmpty } from '../validators'

export class RegisterForm extends React.Component {
  submitForm = values => {
    if (values.password === values.confirm) {
      return fetch(`${apiURL}/users`, {
        method: 'POST',
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          blog: values.blog
        }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(res => {
          if (!res.ok) {
            if (
              res.headers.has('content-type') &&
              res.headers.get('content-type').startsWith('application/json')
            ) {
              return res.json().then(err => Promise.reject(err))
            }
            return Promise.reject({
              code: res.status,
              message: res.statusText
            })
          }
          return
        })
        .catch(err => {
          const { reason, message, location } = err
          if (reason === 'ValidationError') {
            return Promise.reject(new SubmissionError({ [location]: message }))
          }
          if (message) {
            return Promise.reject(new SubmissionError({ _error: message }))
          }
          return Promise.reject(
            new SubmissionError({ _error: 'Error registering user' })
          )
        })
    } else {
      return Promise.reject(
        new SubmissionError({ password: "passwords don't match" })
      )
    }
  }

  render() {
    if (this.props.submitSucceeded) {
      return <Redirect to="/bloggy/login" />
    }

    let errorMessage
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">{this.props.error}</div>
      )
    }
    return (
      <form
        onSubmit={this.props.handleSubmit(this.submitForm)}
        className="RegisterForm"
      >
        <h1>Register New User</h1>
        {errorMessage}
        <Field
          component={Input}
          type="text"
          id="username"
          name="username"
          label="Username"
          validate={[required, nonEmpty]}
        />
        <Field
          component={Input}
          type="password"
          id="password"
          name="password"
          label="Password"
          validate={[required, nonEmpty]}
        />
        <Field
          component={Input}
          type="password"
          id="confirm"
          name="confirm"
          label="Confirm"
          validate={[required, nonEmpty]}
        />
        <Field
          component={Input}
          type="text"
          id="blog"
          name="blog"
          label="Blog Name"
          validate={[required, nonEmpty]}
        />
        <input
          type="submit"
          value="Register"
          disabled={this.props.pristine || this.props.submitting}
        />
      </form>
    )
  }
}

export default reduxForm({
  form: 'register',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('register', Object.keys(errors)[0]))
})(RegisterForm)
