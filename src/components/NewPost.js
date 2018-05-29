import React from 'react'
import './styles/NewPost.css'
import { connect } from 'react-redux'
import { apiURL } from '../config'
import { Redirect } from 'react-router-dom'

class NewPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      success: false
    }
  }

  submitForm = e => {
    e.preventDefault()
    fetch(`${apiURL}/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title: this.title.value,
        content: this.content.value
      }),
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.props.authToken}`
      }
    })
      .then(
        res =>
          (res.status = 201) ? this.setState({ success: true }) : res.json()
      )
      .then(data => this.setState({ error: data.message }))
      .catch(err => this.setState({ error: err }))
  }

  render() {
    if (this.state.success) return <Redirect to="/dashboard" />
    return (
      <form onSubmit={e => this.submitForm(e)}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          name="title"
          ref={e => (this.title = e)}
        />
        <label htmlFor="content">content</label>
        <textarea id="content" name="content" ref={e => (this.content = e)} />
        <input type="submit" value="publish" />
        <div>{this.state.error}</div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.authToken
})

export default connect(mapStateToProps)(NewPost)
