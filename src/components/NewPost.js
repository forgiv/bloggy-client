import React from 'react'
import './styles/NewPost.css'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { newPost } from '../actions/post'
import * as marked from 'marked'

class NewPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slug: '',
      title: '',
      content: '',
      autoSlug: true,
      preview: false
    }
  }

  submitForm = e => {
    e.preventDefault()
    this.props.dispatch(
      newPost(
        {
          title: this.state.title,
          content: this.state.content,
          slug: this.state.slug
        },
        this.props.authToken
      )
    )
  }

  titleToSlug = e => {
    const title = e.target.value
    this.setState({
      title,
      slug: title
        .toLowerCase()
        .split(' ')
        .join('-')
    })
  }

  toggleAutoSlug = e => {
    let updateObj = { autoSlug: e.target.checked }
    if (e.target.checked) {
      updateObj.slug = this.state.title
        .toLowerCase()
        .split(' ')
        .join('-')
    }
    this.setState(updateObj)
  }

  render() {
    if (this.props.post.success) {
      return <Redirect to="/dashboard" />
    } else if (this.state.preview && !this.props.user.loading) {
      return (
        <div>
          <input
            type="button"
            value="close preview"
            onClick={() => this.setState({ preview: false })}
          />
          <article>
            <header>
              <h1>{this.state.title}</h1>
              <h3>{this.props.user.user.username}</h3>
            </header>
            <div
              dangerouslySetInnerHTML={{ __html: marked(this.state.content) }}
            />
            <footer>
              <small>{new Date().toDateString()}</small>
            </footer>
          </article>
        </div>
      )
    }
    return (
      <form onSubmit={e => this.submitForm(e)}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={this.state.title}
          onChange={e =>
            this.state.autoSlug
              ? this.titleToSlug(e)
              : this.setState({ title: e.target.value })
          }
        />
        <label htmlFor="slug">slug</label>
        <input
          type="text"
          value={this.state.slug}
          onChange={e => this.setState({ slug: e.target.value })}
          disabled={this.state.autoSlug}
        />
        <label htmlFor="autoSlug">auto slug</label>
        <input
          type="checkbox"
          checked={this.state.autoSlug}
          onChange={e => this.toggleAutoSlug(e)}
        />
        <label htmlFor="content">content</label>
        <textarea
          id="content"
          name="content"
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
        />
        <input type="submit" value="publish" />
        <input
          type="button"
          value="preview"
          onClick={() => this.setState({ preview: true })}
        />
        <input
          type="button"
          value="cancel"
          onClick={() => this.props.history.push('/dashboard')}
        />
        <div>{this.state.error}</div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.authToken,
  post: state.post,
  user: state.user
})

export default withRouter(connect(mapStateToProps)(NewPost))
