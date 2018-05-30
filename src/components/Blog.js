import React from 'react'
import connect from 'react-redux/lib/connect/connect'
import { getPosts } from '../actions/post'
import { apiURL } from '../config'
import { Link } from 'react-router-dom'
import './styles/Blog.css'

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
        <div>
          {this.props.authToken ? (
            <Link to="/dashboard">dashboard</Link>
          ) : (
            <Link to="/login">login</Link>
          )}
        </div>
        <header>
          <h1>{this.state.blog}</h1>
          <h3>{this.props.match.params.username}</h3>
        </header>
        {this.props.posts.map(post => {
          return (
            <article key={post.title}>
              <header>{post.title}</header>
              {post.content}
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
