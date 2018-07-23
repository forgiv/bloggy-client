import React from 'react'
import { Field, reduxForm, focus } from 'redux-form'
import { registerUser } from '../actions/users'
import { login } from '../actions/auth'
import Input from './input'
import { required, nonEmpty, matches, length, isTrimmed } from '../validators'

const passwordLength = length({ min: 6, max: 72 })
const blogLength = length({ min: 3, max: 72 })
const usernameLength = length({ min: 3 })
const matchesPassword = matches('password')

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { username, password, firstName, lastName } = values
    const user = { username, password, firstName, lastName }
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)))
  }

  render() {
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <Field
          component={Input}
          type="text"
          name="username"
          label="Username"
          validate={[required, nonEmpty, isTrimmed, usernameLength]}
        />
        <Field
          component={Input}
          type="password"
          name="password"
          label="Password"
          validate={[required, passwordLength, isTrimmed]}
        />
        <Field
          component={Input}
          type="password"
          name="passwordConfirm"
          label="Confirm Password"
          validate={[required, nonEmpty, matchesPassword]}
        />
        <Field
          component={Input}
          type="text"
          name="blog"
          label="Blog Name"
          validate={[required, nonEmpty, blogLength]}
        />
        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}
        >
          Register
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm)
