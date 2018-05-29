import React from 'react'
import connect from 'react-redux/lib/connect/connect'
import { getPosts } from '../actions/post'
import { apiURL } from '../config'

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
      <div>
        <h1>{this.state.blog}</h1>
        <h3>{this.props.match.params.username}</h3>
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.post.posts,
  error: state.post.error
})

export default connect(mapStateToProps)(Blog)
