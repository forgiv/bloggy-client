import React from 'react'
import './styles/NewPost.css'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { newPost } from '../actions/post'
import * as marked from 'marked'
import * as FontAwesome from 'react-fontawesome'

export class NewPost extends React.Component {
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
    let updateObj = { autoSlug: !this.state.autoSlug }
    if (updateObj.autoSlug) {
      updateObj.slug = this.state.title
        .toLowerCase()
        .split(' ')
        .join('-')
    }
    this.setState(updateObj)
  }

  render() {
    if (this.props.post.postSuccess) return <Redirect to="/dashboard" />
    if (this.state.preview && !this.props.user.loading) {
      return (
        <div className="Preview">
          <input
            type="button"
            value="close preview"
            onClick={() => this.setState({ preview: false })}
          />
          <article className="Preview">
            <header>
              <h1 className="title">{this.state.title}</h1>
              <h2 className="sub-title">{this.props.user.user.username}</h2>
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
      <form onSubmit={e => this.submitForm(e)} className="NewPost">
        <h1>New Post</h1>
        <label htmlFor="title">Title</label>
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
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          value={this.state.slug}
          onChange={e => this.setState({ slug: e.target.value })}
          disabled={this.state.autoSlug}
        />
        <div className="checkbox">
          <label>Auto Slug</label>
          {this.state.autoSlug ? (
            <FontAwesome
              name="fas fa-check-square"
              size="2x"
              onClick={() => this.toggleAutoSlug()}
            />
          ) : (
            <FontAwesome
              name="fas fa-square"
              size="2x"
              onClick={() => this.toggleAutoSlug()}
            />
          )}
        </div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
        />
        <input type="submit" value="Publish" />
        <input
          type="button"
          value="Preview"
          onClick={() => this.setState({ preview: true })}
        />
        <input
          type="button"
          value="Cancel"
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
