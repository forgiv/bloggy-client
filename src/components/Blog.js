import React from 'react'
import connect from 'react-redux/lib/connect/connect'
import { getPosts } from '../actions/post'
import { apiURL } from '../config'
import { Link } from 'react-router-dom'
import './styles/Blog.css'
import * as removeMarkdown from 'remove-markdown'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blog: null,
      error: null
    }
  }

  componentDidMount() {
    const username = this.props.match.params.username
    this.props.dispatch(getPosts(username))
    fetch(`${apiURL}/users/${username}`)
      .then(res => res.json())
      .then(data => {
        data.blog
          ? this.setState({ blog: data.blog })
          : this.setState({ error: data.message })
      })
      .catch(err => this.setState({ error: err }))
  }

  render() {
    if (this.props.error || this.state.error)
      return <div>{this.props.error || this.state.error}</div>

    return (
      <section className="Blog">
        <header>
          <h1 className="title">{this.state.blog}</h1>
          <h2 className="sub-title">{this.props.match.params.username}</h2>
        </header>
        {this.props.posts.map(post => {
          return (
            <article key={post.title}>
              <header>
                <Link
                  to={`/blog/${this.props.match.params.username}/${post.slug}`}
                >
                  {post.title}
                </Link>
              </header>
              {removeMarkdown(post.content).slice(0, 32)}...
              <footer>
                <small>{post.createdBy}</small>
              </footer>
            </article>
          )
        })}
      </section>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.post.posts,
  error: state.post.error,
  authToken: state.auth.authToken
})

export default connect(mapStateToProps)(Blog)
