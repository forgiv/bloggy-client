import React from 'react'
import withRouter from 'react-router-dom/withRouter'
import connect from 'react-redux/lib/connect/connect'
import { getPost } from '../actions/post'
import { Link } from 'react-router-dom'
import './styles/Post.css'
import * as marked from 'marked'

class Post extends React.Component {
  componentWillMount() {
    this.props.dispatch(
      getPost(this.props.match.params.username, this.props.match.params.slug)
    )
  }

  render() {
    if (this.props.post) {
      return (
        <div className="Post">
          {this.props.authToken ? (
            <Link to="/dashboard">dashboard</Link>
          ) : (
            <Link to="/login">login</Link>
          )}
          <Link to={`/blog/${this.props.match.params.username}`}>
            back to blog
          </Link>
          <article>
            <header>
              <h1>{this.props.post.title}</h1>
              <h3>{this.props.match.params.username}</h3>
            </header>
            <div
              dangerouslySetInnerHTML={{
                __html: marked(this.props.post.content)
              }}
            />
            <footer>
              <small>{this.props.post.createdAt}</small>
            </footer>
          </article>
        </div>
      )
    }
    return <div>404 - Post not found</div>
  }
}

const mapStateToProps = state => ({
  post: state.post.posts[0],
  authToken: state.auth.authToken
})

export default withRouter(connect(mapStateToProps)(Post))
