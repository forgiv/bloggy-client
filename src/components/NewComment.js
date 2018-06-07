import React from 'react'
import { apiURL } from '../config'
import connect from 'react-redux/lib/connect/connect'
import { getComments } from '../actions/comment'
import './styles/NewComment.css'

export class NewComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      content: ''
    }
  }

  submitComment = e => {
    e.preventDefault()
    fetch(`${apiURL}/comments`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.props.authToken}`
      },
      body: JSON.stringify({
        content: this.state.content,
        postId: this.props.postId
      })
    })
      .then(res => {
        if (!res.ok) {
          return res.json()
        }
        this.setState({ content: '' })
        this.props.dispatch(getComments(this.props.username, this.props.slug))
      })
      .then(data => this.setState({ error: data.message }))
      .catch(err => this.setState({ error: err.statusText }))
  }

  render() {
    if (this.props.authToken) {
      let err
      if (this.state.error) {
        err = <span>{this.state.error}</span>
      }
      return (
        <form onSubmit={e => this.submitComment(e)} className="NewComment">
          {err}
          <label htmlFor="content">Comment:</label>
          <textarea
            id="content"
            name="content"
            onChange={e => this.setState({ content: e.target.value })}
            value={this.state.content}
          />
          <input type="submit" value="add comment" />
        </form>
      )
    }
    return <div />
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.authToken,
  postId: state.post.posts[0].id
})

export default connect(mapStateToProps)(NewComment)
